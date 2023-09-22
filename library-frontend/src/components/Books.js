import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FILTERED_BOOKS } from '../queries'
import { useState, useImperativeHandle, forwardRef } from 'react'

const Books = forwardRef((props, ref) => {
  const [genreToSearch, setGenreToSearch] = useState('all genres')
  const books = useQuery(ALL_BOOKS)

  const filteredBooks = useQuery(FILTERED_BOOKS, {
    variables: {genre: genreToSearch},
    skip: genreToSearch === 'all genres',
  })

  useImperativeHandle(ref, () => {
    return {setGenreToSearch}
  })

  if (!props.show || books.loading || filteredBooks.loading) {
    return null
  }

  const genres = new Set(['all genres'])

  const uniqueGenres = books.data.allBooks.reduce((accumulator, book) => {
    book.genres.forEach((genre) => {
      accumulator.add(genre)
    })
    return accumulator
  }, genres)


  if (genreToSearch !== 'all genres') {
    return (
      <div>
        <h2>books</h2>
        <p>
          in genre <b>{genreToSearch}</b>
        </p>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
        <div>
        {Array.from(uniqueGenres).map((g) => (
          <button key={g} onClick={() => setGenreToSearch(g)}>
            {g}
          </button>
        ))}
      </div>
      </div>
    )
  }


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from(uniqueGenres).map((g) => (
          <button key={g} onClick={() => setGenreToSearch(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  )
})

export default Books
