import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './contexts/BookContext';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';
import BackToTop from './components/UI/BackToTop';
import './App.css';

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="App">
          <TopBar />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
          <BackToTop />
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;