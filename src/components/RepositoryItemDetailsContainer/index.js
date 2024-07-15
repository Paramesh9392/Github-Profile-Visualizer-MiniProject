import UsernameContext from '../../context/UsernameContext'
import RepositoryItemDetails from '../RepositoryItemDetails'

const RepositoryItemDetailsContainer = props => {
  const {match} = props
  const {params} = match
  const {repoName} = params

  return (
    <UsernameContext.Consumer>
      {value => {
        const {username} = value
        return <RepositoryItemDetails username={username} repoName={repoName} />
      }}
    </UsernameContext.Consumer>
  )
}
export default RepositoryItemDetailsContainer

/* import {withRouter} from 'react-router-dom'
import UsernameContext from '../../Context/UsernameContext'
import RepositoryItemDetails from '../RepositoryItemDetails'

const RepositoryItemDetailsContainer = props => {
  const {match} = props
  const {params} = match
  const {id} = params

  return (
    <UsernameContext.Consumer>
      {value => {
        const {username} = value
        return <RepositoryItemDetails username={username} repoName={id} />
      }}
    </UsernameContext.Consumer>
  )
}
export default withRouter(RepositoryItemDetailsContainer)
*/
