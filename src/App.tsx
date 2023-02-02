import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import "./App.css"
import Header from "./components/header/Header"
import Details from "./pages/details/Details"
import Login from "./pages/login/Login"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
