import './App.css'
// router
import Router from './router/router'
import { UserProvider } from './context/user.context'
function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  )
}

export default App
