import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import DashBoard from "./pages/admin/DashBoard"
import Products from "./pages/admin/Products"
import SignIn from "./pages/admin/SignIn"
import { Provider } from "react-redux"
import { AdminStore } from "./store"
import Sidebar from "./components/ui/Sidebar"
import PageNotFound from "./pages/admin/PageNotFound"
import Private from "./pages/admin/Private"
import AddProduct from "./components/AddProduct"

function App() {

  return (
    <>
      <Provider store={AdminStore}>
        <Router>
          <Routes>
            <Route path="/admin" element={<Private />}>
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="products" element={<Products />} />
              <Route path="products/add" element={<AddProduct />} />
            </Route>

            <Route path="/admin/login" element={<SignIn />} />
            <Route path="*" element={<PageNotFound />} />

          </Routes>
        </Router>
      </Provider >

    </>
  )
}

export default App
