const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
// const { v1: uuid } = require('uuid')
const { MONGODB_URI, SECRET } = require('./utils/config')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author{
    name: String!
    bookCount: Int
    born: Int
  }
  type Book{
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors(name: String): [Author!]!
    me: User
  }
  type Mutation{
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      sentBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }  
`
const filterAuthor = (books, args) => {
  return args.author? books.filter(book => book.author === args.author) :  books
}
const filterGenres = (books, args) => {
  return args.genre? books.filter(book => book.genres.includes(args.genre)) :  books
}
let books 
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    // allBooks: (root, args) => filterGenres(filterAuthor(books, args), args),
    allBooks: async (root, args) => {
      let query = {}
      if(args.author) {
        const author = await Author.findOne({name: args.author})
        query.author = author.id
      }
      if(args.genre) {
        query.genres = { $in: [genre] } 
      }

      return Book.find(query).populate('author')
     
    },
    // allAuthors: (root, args) => authors.map(author => ({
    //   name: author.name,
    //   bookCount: books.filter(b => b.author === author.name).length,
    //   born: author.born
    // }))
    allAuthors: async () => {
      books = await Book.find()
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) =>
      books.filter(b => String(b.author) === String(root.id)).length 
  },
  Mutation: {
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== SECRET ) {
        console.log(user, args.password, SECRET)
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, SECRET) }
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const { author, ...addBook } = args
      let book = new Book(addBook)
      try{
        book.author = await Author.findOne({name: author})
        await book.save()
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      book = await Book.findById(book.id).populate('author') 
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author =  await Author.findOne({name: args.name})
      author.born = args.sentBornTo
      try {
        author.save({validateModifiedOnly: true})
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl  }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})