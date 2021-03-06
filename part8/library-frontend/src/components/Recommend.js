import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
    const [allBooks, result]  = useLazyQuery(ALL_BOOKS)
    const [getMe, meResult]  = useLazyQuery(GET_ME)
    useEffect(() => {
      if(props.show) {
        getMe()
      }
    }, [props.show])
    useEffect(() => {
        const meData = meResult.data
        if(meData) {
            allBooks({
                author: meData.me.author,
                genre: meData.me.genre
            })
        }
    }, [meResult.data])
    if (!props.show) {
      return null
    }
    return (
        <div>
            <h2>
                recommendations
            </h2>  
            <p>books in your favorite genre patterns</p>    
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td>author</td>
                        <td>published</td>
                    </tr>
                    {result.data && result.data.allBooks.map(book => (
                        <tr>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>  
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend