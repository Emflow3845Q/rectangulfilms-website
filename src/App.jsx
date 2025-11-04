import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Home from './page/Home';
import AboutPage from './page/AboutPage';
import ContactPage from './page/ContactPage';
import ServicesPage from './page/ServicesPage';
import ProjectsPage from './page/ProjectsPage';
import Footer from './layout/Footer';
import CinematicLoading from './components/CinematicLoading';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Pequeño delay para asegurar que la animación de salida termine
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  };

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
        {/* Loading Screen */}
        {isLoading && (
          <CinematicLoading onLoadingComplete={handleLoadingComplete} />
        )}
        
        {/* Contenido principal */}
        {showContent && (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/services" element={<ServicesPage />} />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;