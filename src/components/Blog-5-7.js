import blogService from './../services/blogs'

const Blog = ({ blog }) => {
  const handleClick = () => {
    blogService.get(blog.id)
      .then(b => {
        b.likes = b.likes + 1
        blogService.update(blog.id, b)
      })
  }

  return(
    <div className='blog'>
      {blog.title} {blog.author}
      <button onClick={handleClick}>like</button>
    </div>
  )
}



export default Blog