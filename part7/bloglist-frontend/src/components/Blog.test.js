import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog', () => {
  const note = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }

  const component = render(
    <Blog blog={note} />
  )

  expect(component.container).toHaveTextContent(
    'Canonical string reduction'
  )
  expect(component.container).toHaveTextContent(
    'Edsger W. Dijkstra'
  )
})

test('view Button', () => {
  const note = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }

  const component = render(
    <Blog blog={note} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent(
    'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  )
  expect(component.container).toHaveTextContent(
    '12'
  )
})

test('like Button', () => {
  const note = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }
  const handleLikes = jest.fn()
  const handleRemoveBlog = jest.fn()
  const component = render(
    <Blog blog={note} handleLikes={handleLikes} handleRemoveBlog={handleRemoveBlog}/>
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(handleLikes.mock.calls).toHaveLength(2)
})