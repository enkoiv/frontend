import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog-5-10'
import userEvent from '@testing-library/user-event'

test('if like is pressed twice, event handler is called twice', async () => {
    const blog = {
        title: 'My blog',
        author: 'Katja'
    }
    const user = userEvent.setup()
    const mockHandler = jest.fn()

    render(<Blog blog={blog} />)

    screen.debug()
    const button = screen.getByText('like', {exact: false})
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})