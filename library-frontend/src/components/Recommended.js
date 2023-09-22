import { USER, FILTERED_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Recommended = (props) => {
  const user = useQuery(USER)

  const filteredBooks = useQuery(FILTERED_BOOKS, {
    skip: !user?.data?.me?.favoriteGenre,
    variables: { genre: user?.data?.me?.favoriteGenre },
  })

  if (!props.show || user.loading || filteredBooks.loading) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{user.data.me.favoriteGenre}</b>
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
    </div>
  )
}

export default Recommended
