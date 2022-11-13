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
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSucces from "./pages/checkout/CheckoutSucces";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails";




function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer autoClose={2500}/>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/checkout-success" element={<CheckoutSucces/>} />
          <Route path="/order-history" element={<OrderHistory/>} />
          <Route path="/order-details/:id" element={<OrderDetails/>} />



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
