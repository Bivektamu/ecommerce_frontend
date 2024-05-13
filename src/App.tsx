import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import DashBoard from "./pages/admin/DashBoard"
import Products from "./pages/admin/Products"
import SignIn from "./pages/admin/SignIn"
import { Provider, useSelector } from "react-redux"
import { AdminStore } from "./store"
import PageNotFound from "./pages/admin/PageNotFound"
import Private from "./pages/admin/Private"
import AddProduct from "./components/ui/admin/AddProduct"
import EditProduct from "./components/ui/admin/EditProduct"
import Orders from "./pages/admin/Orders"
import Customers from "./pages/admin/Customers"
import Reviews from "./pages/admin/Reviews"

function App() {

  return (

    <>
      <Provider store={AdminStore}>


        <Router>
          <Routes>
            <Route path="/admin" element={<Private />}>
              <Route
                path="dashboard" element={<DashBoard />}
              />
              <Route
                path="products"
                element={<Products />} />
              <Route
                path="products/add"
                element={<AddProduct />} />

              <Route
                path="products/:slug"
                element={<EditProduct />} />

              <Route
                path="orders/"
                element={<Orders />} />

              <Route
                path="customers/"
                element={<Customers />} />

              <Route
                path="reviews/"
                element={<Reviews />} />

            </Route>

            <Route
              path="/admin/login"
              element={<SignIn />} />

            <Route
              path="*"
              element={<PageNotFound />} />

          </Routes>
        </Router>
      </Provider >

    </>
  )
}

export default App
