import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import AuthProvider from './context/AuthContext';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
