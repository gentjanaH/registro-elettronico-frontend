import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import './App.css'
import MyNavbar from "./components/MyNavbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FormRegistrazione from "./components/FormRegistrazione"
import FormLogin from "./components/FormLogin"
import { Container, Row } from "react-bootstrap"
import Footer from "./components/Footer"
import NotFound from "./components/NotFound"
import HomePage from "./components/HomePage"

function App() {


  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Container fluid className="d-flex flex-column min-vh-100 px-0">
          <Row className="flex-grow-1 d-flex justify-content-center">
            <Routes>

              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<FormRegistrazione />} />
              <Route path="/login" element={<FormLogin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Row>
          <Footer />
        </Container>
      </BrowserRouter>



    </>
  )
}

export default App
