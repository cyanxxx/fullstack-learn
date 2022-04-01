import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import Select from 'react-select'

const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    bookCount
    born
  }
}
`

const EDIT_AUTHOR = gql`
mutation($name: String!, $sentBornTo: Int!) {
  editAuthor(name: $name, sentBornTo: $sentBornTo) {
    name, born, bookCount
  }
}
`

const Authors = (props) => {
  const [allAuthors, result] = useLazyQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR)
  const [nameOption, setNameOption] = useState(null)
  const [born, setBorn] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    const result = editAuthor({variables: {name: nameOption.value, sentBornTo: parseInt(born)}})
    
  }
  useEffect(() => {
    if(props.show) {
      allAuthors()
    }
  }, [props.show])
  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {!result.data? 
            <tr><td>loading...</td></tr>
            :result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {result.data && (
        <form onSubmit={handleSubmit}> 
          <h2>Set birthdayYear</h2>
          <Select 
            value={nameOption}
            onChange={(selectedOption) => setNameOption(selectedOption)}
            options={result.data.allAuthors.map(author => ({value: author.name, label: author.name}))} 
          />
          born: 
          <input 
            type="text"  
            value={born}
            onChange={(e) => setBorn(e.target.value)} />
          <div>
            <button type='submit'>update author</button>
          </div>       
        </form>
      )}
    </div>
  )
}

export default Authors
