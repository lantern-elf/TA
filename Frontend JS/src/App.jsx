import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BaseComponent from 'bootstrap/js/dist/base-component'
import Home from './pages/home/page'
import About from './pages/about/page'
import NotFound from './pages/notfound/page'
import Test from './pages/test/page'
import UserDetail from './pages/test/userDetail'
import Login from './pages/login_register/login'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/test' element={<Test />} />
        <Route path='/test/:id' element={<UserDetail />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
