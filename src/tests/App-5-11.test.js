import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './../components/Blog'

test('renders title', () => {
    const blog = {
        title: 'My blog',
        author: 'Katja'
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('My blog', {exact: false})

    expect(element).toBeDefined()
})

test('renders author', () => {
    const blog = {
        title: 'My blog',
        author: 'Katja'
    }

    render(<Blog blog={blog}/>)
    screen.debug()
    const element = screen.getByText('Katja', {exact: false})
    screen.debug(element)

    expect(element).toBeDefined()
})