import Home from "./pages/home/Home"
import "./App.css"
import Header from "./components/header/Header"
import Details from "./pages/details/Details"
import Login from "./pages/login/Login"
import Router from "./router/Router"
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
