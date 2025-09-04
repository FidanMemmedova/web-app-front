import Container from "./Components/Container"
import "./Assets/scss/resets.scss"
import { Outlet } from "react-router-dom"
function App() {

  return (
    <Container>
      <Outlet />
    </Container>
  )
}

export default App
