import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const handleLike = () => {
    blogService.get(blog.id)
      .then(b => {
        b.likes = b.likes + 1
        blogService.update(blog.id, b)
      })
  }

  const handleRemove = () => {
    if (window.confirm('Please confirm the removal of ' + blog.title))
    {
      blogService.get(blog.id)
        .then(blogService.remove(blog.id, user))
    }
  }

  if ((user.username === blog.user.username) &&
    (user.name === blog.user.name)) {
    return(
      <div className='blog'>
        {blog.title} {blog.author}
        <button onClick={handleLike}>like</button>
        <button onClick={handleRemove}>remove</button>
      </div>
    )}
  return(
    <div className='blog'>
      {blog.title} {blog.author}
      <button onClick={handleLike}>like</button>
    </div>
  )
}

export default Blog