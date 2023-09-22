import { useState, useEffect, useRef } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Message from './components/Message'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('books')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const booksRef = useRef()
  const client = useApolloClient()

  useEffect(() => {
    const localToken = localStorage.getItem('loggedInUser')
    if (localToken) {
      setToken(localToken)
    }
  }, [])

  const notify = (message) => {
    console.log('notify')
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button
          onClick={() => {
            booksRef.current.setGenreToSearch('all genres')
            setPage('books')
          }}
        >
          books
        </button>

        {token ? (
          <>
            {' '}
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Message errorMessage={errorMessage} />

      <Login
        show={page === 'login'}
        setToken={setToken}
        notify={notify}
        setPage={setPage}
      />

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} ref={booksRef} />

      <NewBook show={page === 'add'} notify={notify} />

      <Recommended show={page === 'recommend'} />
    </div>
  )
}

export default App
