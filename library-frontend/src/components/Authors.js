import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'

const Authors = (props) => {
  const [born, setBorn] = useState('')
  const [name, setName] = useState('')
  const [updateBorn] = useMutation(EDIT_AUTHOR)
  const authors = useQuery(ALL_AUTHORS)
  if (!props.show || authors.loading) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()
    console.log('submit')
    updateBorn({ variables: { name: name, setBornTo: born } })
    setBorn('')
    setName('')
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token ? (
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <div>
              <select
                value={name}
                onChange={({ target }) => setName(target.value)}
              >
                <option value="">Select an author</option>
                {authors.data.allAuthors.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              born
              <input
                type="number"
                value={born}
                onChange={({ target }) => setBorn(Number(target.value))}
              />
            </div>

            <button type="submit">update author</button>
          </form>
        </div>
      ) : null}
    </div>
  )
}

export default Authors
