import React from 'react'
import Login from './Login'
import Cadastrar from './Cadastrar'
import Home from './Home';
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/cadastrar' element={<Cadastrar />}></Route>
      <Route path='/' element={<Home />}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App