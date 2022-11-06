import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
//Pages
import {Home , Contact, Reset , Login , Register , Admin} from './pages'
//Components
import {Header , Footer } from './components'
// toaster
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/cart/Cart";
import AdminOnyRoute from "./components/adminOnyRoute/AdminOnyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";




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
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          {/* Admin */}
    
          <Route path="/admin/*"
           element={<AdminOnyRoute>
            <Admin/>
          </AdminOnyRoute>} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
