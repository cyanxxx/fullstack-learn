import React, { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author{
      name
    }
    published
  }
}
`
const Books = (props) => {
  const [allBooks, result]  = useLazyQuery(ALL_BOOKS)
  useEffect(() => {
    if(props.show) {
      allBooks()
    }
  }, [props.show])
  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!result.data? 
            <tr><td>loading...</td></tr>
            :result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
