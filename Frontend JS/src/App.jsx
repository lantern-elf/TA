// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/page';
import About from './pages/about/page';
import NotFound from './pages/notfound/page';
import Test from './pages/test/page';
import UserDetail from './pages/test/userDetail';
import Login from './pages/login_register/login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
          }/>
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
          }/>
          <Route path="/about" element={<About />} />
          <Route path="/test" element={<Test />} />
          <Route path="/test/:id" element={<UserDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
