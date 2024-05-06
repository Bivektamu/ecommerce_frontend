import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import DashBoard from "./pages/admin/DashBoard"
import Products from "./pages/admin/Products"
import SignIn from "./pages/admin/SignIn"
import { Provider } from "react-redux"
import { AdminStore } from "./store"

function App() {

  return (
    <>
      <Router>

      </Router>
      <Provider store={AdminStore}>

        <Router>
          <Routes>

            <Route path="/admin/login" element={<SignIn />} />

            <Route path='/admin' element={<Outlet />}>
            </Route>
            <Route path="/admin/dashboard" element={<DashBoard />} />
            <Route path="/admin/products" element={<Products />} />

          </Routes>

        </Router>
      </Provider>

    </>
  )
}

export default App
