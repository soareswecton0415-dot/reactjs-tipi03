import React, { useEffect, useState } from 'react';

import Login from './pages/Login'
import Cadastrar from './pages/Cadastrar'
import Home from './pages/Home';
import Cadastrados from './pages/Cadastrados';
import Editar from './pages/Editar';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from './services/ProtectedRoute';
import axios from 'axios';

const App = () => {

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:7006", { withCredentials: true })
      .then(res => {
        setAuth(res.data.valid);
      })
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) {
    return <div>Carregando...</div>
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/cadastrar' element={<Cadastrar />}></Route>

          <Route path='/' element={
            <ProtectedRoute auth={auth}>
            <Home />
            </ProtectedRoute>
          }></Route>

          <Route path='/cadastrados' element={
            <ProtectedRoute auth={auth}>
            <Cadastrados />
            </ProtectedRoute>
          }></Route>

          <Route path='/editar/:id' element={
            <ProtectedRoute auth={auth}>
            <Editar />
            </ProtectedRoute>
          }></Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;