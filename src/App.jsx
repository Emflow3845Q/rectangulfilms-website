import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Home from './page/Home';
import ContactPage from './page/ContactPage';
import ServicesPage from './page/ServicesPage';
import Footer from './layout/Footer';

function App() {

  // useEffect(() => {
  //   const handleContextMenu = (e) => e.preventDefault();

  //   const handleKeyDown = (e) => {
  //     if (
  //       e.key === "F12" || // DevTools
  //       (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") || // Ctrl+Shift+I
  //       (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") || // Ctrl+Shift+J
  //       (e.ctrlKey && e.key.toLowerCase() === "u") // Ctrl+U (ver código fuente)
  //     ) {
  //       e.preventDefault();
  //       e.stopPropagation();
  //     }
  //   };

  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  return (
    <Router>
     <div className="App select-none">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;