import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import MyList from './pages/MyList';
import Player from './pages/Player';
import AdminForm from './components/AdminForm';
import AdminPage from './pages/AdminPage';



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute> <Home/> </PrivateRoute>} />
        <Route path="/login" element={ <Login />} />
        <Route path="/my-list" element={<PrivateRoute> <MyList/> </PrivateRoute>} />
        <Route path="/player" element={<PrivateRoute> <Player/> </PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute> <AdminPage/> </PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
