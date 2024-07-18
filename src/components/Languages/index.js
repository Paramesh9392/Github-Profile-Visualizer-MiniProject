import './index.css'

const colors = ['style1', 'style2', 'style3', 'style4', 'style5']

const Languages = props => {
  const {languageDetails} = props
  const {name} = languageDetails

  const color = `${colors[Math.ceil(Math.random() * colors.length - 1)]}`

  return (
    <div className={`language ${color}`}>
      <p>{name}</p>
    </div>
  )
}
export default Languages
