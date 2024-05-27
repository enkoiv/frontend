const BlogForm = ({
  handleSubmit,
  newTitle,
  handleTitleChange,
  newAuthor,
  handleAuthorChange,
  newUrl,
  handleUrlChange
}) => {
  return(
    <form onSubmit={handleSubmit}>
      <h1>create new</h1>
      <div>
        title:
        <input
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          value={newUrl}
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm