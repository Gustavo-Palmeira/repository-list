import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/header/header'
import Footer from './components/footer/footer'
import Home from './pages/home/home'
import RepositoryDetails from './pages/repositoryDetails/repositoryDetails'
import './styles/global.scss'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repository/:user/:name" element={<RepositoryDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
