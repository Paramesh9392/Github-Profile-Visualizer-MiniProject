import React from 'react'

const UsernameContext = React.createContext({
  username: '',
  changeUserName: () => {},
})
export default UsernameContext
