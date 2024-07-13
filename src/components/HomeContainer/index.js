import UsernameContext from '../../Context/UsernameContext'
import Home from '../Home'

const HomeContainer = () => (
  <UsernameContext.Consumer>
    {value => {
      const {username} = value
      return <Home username={username} />
    }}
  </UsernameContext.Consumer>
)
export default HomeContainer
