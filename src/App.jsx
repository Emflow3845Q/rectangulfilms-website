import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './layout/Header';
import Home from './pages/HomePage';
import Aboutpages from './pages/AboutPage';
import Servicespages from './pages/ServicesPage';
import Rentalspages from './pages/RentalsPage';
import Motionpages from './pages/MotionPage';
import Footer from './layout/Footer';
import CameraFrameUI from './components/CinematicLoading';
import TargetCursor from './components/TargetCursor';
import Stillpages from './pages/StillPage';
function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      if (
        e.key === "F12" || // DevTools
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") || // Ctrl+Shift+J
        (e.ctrlKey && e.key.toLowerCase() === "u") // Ctrl+U (ver código fuente)
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <div className="App select-none bg-black min-h-screen">
          {/* Loading Screen */}
          {isLoading && (
            <CameraFrameUI onLoadingComplete={handleLoadingComplete} />
          )}

          {/* Main Content */}
          {!isLoading && (
            <>
              {/* Custom Cursor */}
              <TargetCursor
                spinDuration={2}
                hideDefaultCursor={true}
                cornerColor="#ec233c"
                targetSelector="a, button, input, textarea, select, [role='button'], [tabindex]:not([tabindex='-1']), [onclick], [onclick]:not([onclick='']), .interactive, .cursor-target, .project-card, .service-item, .nav-link, .menu-item, .card, .btn, .link"
              />

              {/* Header */}
              <Header />

              {/* Main Routes */}
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<Aboutpages />} />
                  <Route path="/motion" element={<Motionpages />} />
                  <Route path="/rentals" element={<Rentalspages />} />
                  <Route path="/services" element={<Servicespages />} />
                  <Route path="/stills" element={<Stillpages />} />
                </Routes>
              </main>

              {/* Footer */}
              <Footer />
            </>
          )}
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;