import { useState } from 'react';
import './App.css';
import { ThemeProvider } from './components/theme-provider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Corrected import for default export
import ProjectView from './pages/ProjectView'; // Corrected import for default export
import { ModeToggle } from './components/mode-toggle';
import Footer from './pages/sub-components/Footer';
import { ToastContainer } from 'react-toastify';

function App() {
  const [count, setCount] = useState(0); // This is unused, consider removing it

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <div className="mode-toggle-container">
            <ModeToggle />
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectView />} />
            </Routes>
          </div>
          <Footer />
          <ToastContainer position='bottom-right' theme='dark' />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;