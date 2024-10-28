import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute> <Home/> </PrivateRoute>} />
        <Route path="/login" element={ <Login />} />
        
      </Routes>
    </Router>
  );
};

export default App;
