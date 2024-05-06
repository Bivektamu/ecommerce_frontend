import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import DashBoard from "./pages/admin/DashBoard"
import Products from "./pages/admin/Products"
import SignIn from "./pages/admin/SignIn"
import { Provider } from "react-redux"
import { AdminStore } from "./store"
import Sidebar from "./components/ui/Sidebar"
import PageNotFound from "./pages/admin/PageNotFound"

function App() {

  return (
    <>
      <Provider store={AdminStore}>
        <Router>
          <Routes>
            <Route path="/admin" element={<>
              <Sidebar />
              <Outlet />
            </>}>
              <Route path="" element={<DashBoard />} />
              <Route path="products" element={<Products />} />
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
