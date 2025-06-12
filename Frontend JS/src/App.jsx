import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/home/page';
import About from './pages/about/page';
import NotFound from './pages/notfound/page';
import Test from './pages/test/page';
import UserDetail from './pages/test/userDetail';
import Login from './pages/login_register/login';
import Tasks from './pages/tasks/page';
import Register from './pages/login_register/register';
import ProtectedRoute from './components/ProtectedRoute';
import Manage from './pages/manage/page';
import UserView from './pages/user/userView';
import TaskView from './pages/tasks/taskView';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute requiredRole='intern'>
              <Home />
            </ProtectedRoute>
          }/>
          <Route path="/home" element={
            <ProtectedRoute requiredRole='intern'>
              <Home />
            </ProtectedRoute>
          }/>
          <Route path="/tasks" element={
            <ProtectedRoute requiredRole={'intern'}>
              <Tasks />
            </ProtectedRoute>
          }/>
          <Route path="/task/:id" element={<TaskView />} />
          <Route path="/about" element={<About />} />
          <Route path="/test" element={
            <ProtectedRoute requiredRole='admin'>
              <Test />
            </ProtectedRoute>
          }/>
          <Route path="/manage" element={
            <ProtectedRoute requiredRole='admin'>
              <Manage />
            </ProtectedRoute>
          }/>
          <Route path='/user/:id' element = {
            <ProtectedRoute requiredRole='admin'>
              <UserView />
            </ProtectedRoute>
          }/>
          <Route path="/test/:id" element={
            <ProtectedRoute requiredRole='admin'>
              <UserDetail />
            </ProtectedRoute>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
