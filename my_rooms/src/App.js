import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookingPage from './pages/BookingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/home' exact element={<HomePage />} />
          <Route path='/book/:roomid/:fromDate/:toDate' exact element={<BookingPage />} />
          <Route path='/register' exact element={<RegisterPage />} />
          <Route path='/login' exact element={<LoginPage />} />
          <Route path="/profile" exact element={<ProfilePage/>} />
          <Route path="/admin" exact element={<AdminPage/>} />
          <Route path="/" exact element={<LandingPage/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
