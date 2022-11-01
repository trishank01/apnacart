import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
//Pages
import {Home , Contact, Reset , Login , Register} from './pages'
//Components
import {Header , Footer } from './components'
// toaster
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
