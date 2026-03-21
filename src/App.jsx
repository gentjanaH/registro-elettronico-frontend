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
import OffertaFormativa from "./components/OffertaFormativa"
import CorsiExtra from "./components/CorsiExtra"
import Materie from "./components/Materie"
import Contatti from "./components/Contatti"
import HomePageStudentiGenitori from "./components/HomePageStudentiGenitori"
import ModaleGiustificaAssenze from "./components/ModaleGiustificaAssenze"
import Assenze from "./components/Assenze"
import VotiPerMateria from "./components/VotiPerMateria"
import Bacheca from "./components/Bacheca"
import HomePageProfessore from "./components/HomePageProfessore"
import HomePageClasse from "./components/HomePageClasse"
import { Provider } from 'react-redux'
import store from "./redux/store";
import SelezioneProfiloFigli from "./components/SelezioneProfiloFigli"


function App() {


  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <MyNavbar />
          <Container fluid className="d-flex flex-column min-vh-100 px-0">
            <Row className="flex-grow-1 d-flex justify-content-center">
              <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<FormRegistrazione />} />
                <Route path="/login" element={<FormLogin />} />
                <Route path="/offerta_formativa" element={<OffertaFormativa />} />
                <Route path="/corsi-extra" element={<CorsiExtra />} />
                <Route path="/materie" element={<Materie />} />
                <Route path="/contatti" element={<Contatti />} />
                {/* questa rotta andrà collegata al login */}
                <Route path="/classe/:idClasse/:nome/studente/:id_studente" element={<HomePageStudentiGenitori />} />
                <Route path="/genitore/:idGenitore" element={<SelezioneProfiloFigli />} />
                <Route path="/professore/:id_professore" element={<HomePageProfessore />}></Route>
                <Route path="/classe/:idClasse/:nomeClasse" element={<HomePageClasse />}></Route>
                <Route path="/assenze/:idStudente" element={<Assenze />} />
                <Route path="/giustifica-assenze" element={<ModaleGiustificaAssenze />} />
                <Route path="/voti/:idStudente" element={<VotiPerMateria />} />
                <Route path="/bacheca" element={<Bacheca />}></Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Row>
            <Footer />
          </Container>
        </BrowserRouter>
      </Provider>


    </>
  )
}

export default App
