import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription, gql } from '@apollo/client';
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log(dataInStore)
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook= subscriptionData.data.bookAdded
      alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('libraryUser')
    if (loggedUser) {
      setToken(loggedUser)
    }
  }, [])
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token? (
           <>
           <button onClick={() => setPage('add')}>add book</button>
           <button onClick={() => setPage('recommend')}>recommend</button>
           <button onClick={handleLogout}>logout</button>
         </>
        )
        : (
          <button onClick={() => setPage('login')}>login</button>
        )
      }
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
      
      <Login show={page === 'login'} setToken={setToken} />

      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App
