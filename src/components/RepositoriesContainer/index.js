import UsernameContext from '../../context/UsernameContext'
import Repository from '../Repository'

const RepositoriesContainer = () => (
  <UsernameContext.Consumer>
    {value => {
      const {username} = value
      return <Repository username={username} />
    }}
  </UsernameContext.Consumer>
)
export default RepositoriesContainer
