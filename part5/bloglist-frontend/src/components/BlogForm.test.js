import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const handleAddBlog = jest.fn()
  const handleChange = (action) => (e) => {
    const value = e.target.value
    action(value)
  }

  const component = render(
    <BlogForm handleAddBlog={handleAddBlog} handleChange={handleChange} />
  )

  const input = component.container.querySelector('#author')
  const form = component.container.querySelector('#blogForm')

  fireEvent.change(input, {
    target: { value: 'cyan' }
  })
  fireEvent.submit(form)

  expect(handleAddBlog.mock.calls).toHaveLength(1)
  expect(handleAddBlog.mock.calls[0][0].author).toBe('cyan')
})