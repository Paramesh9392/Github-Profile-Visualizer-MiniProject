import UsernameContext from '../../Context/UsernameContext'
import Analysis from '../Analysis'

const AnalysisContainer = () => (
  <UsernameContext.Consumer>
    {value => {
      const {username} = value
      return <Analysis username={username} />
    }}
  </UsernameContext.Consumer>
)
export default AnalysisContainer
