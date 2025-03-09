import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/page'
import About from './pages/about/page'
import NotFound from './pages/notfound/page'
import Test from './pages/test/page'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </Router>
  )
}

export default App
