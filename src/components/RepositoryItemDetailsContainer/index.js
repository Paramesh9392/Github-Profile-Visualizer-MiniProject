import {withRouter} from 'react-router-dom'
import UsernameContext from '../../context/UsernameContext'
import RepositoryItemDetails from '../RepositoryItemDetails'

const RepositoryItemDetailsContainer = props => {
  const {match} = props
  const {params} = match
  const {id} = params

  return (
    <UsernameContext.Consumer>
      {value => {
        const {username} = value
        return <RepositoryItemDetails username={username} id={id} />
      }}
    </UsernameContext.Consumer>
  )
}
export default withRouter(RepositoryItemDetailsContainer)
