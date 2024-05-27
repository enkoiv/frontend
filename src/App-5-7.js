import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog-5-7'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageText, setMessageText] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

      setMessageText('login succeeded')
      setTimeout(() => {
        setMessageText(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const clearUser = () => {
    window.localStorage.clear()
  }

  const blogFormRef = useRef()

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
      })

    setMessageText('a new blog created')

    setTimeout(() => {
      setMessageText(null)
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const loggedIn = () => {
    return (
      <div>
        <h1>blogs</h1>
        <p>{user.name} logged in
          <button onClick={clearUser}>
            logout
          </button>
        </p>
      </div>
    )
  }

  const blogList = () => {
    return (
      <div>
        <p> </p>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} isError={true}/>
      <Notification message={messageText} isError={false}/>

      {!user && loginForm()}
      {user && loggedIn()}
      {user &&
          <Togglable buttonLabel="create" ref={blogFormRef}>
            <BlogForm
              handleSubmit={addBlog}
              newTitle={newTitle}
              handleTitleChange={({ target }) => setNewTitle(target.value)}
              newAuthor={newAuthor}
              handleAuthorChange={({ target }) => setNewAuthor(target.value)}
              newUrl={newUrl}
              handleUrlChange={({ target }) => setNewUrl(target.value)}
            />
          </Togglable>
      }
      {user && blogList()}

    </div>
  )
}

export default App