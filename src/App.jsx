import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import './App.css'
import MyNavbar from "./components/MyNavbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FormRegistrazione from "./components/FormRegistrazione"

function App() {


  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/register" element={<FormRegistrazione />} />
        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
