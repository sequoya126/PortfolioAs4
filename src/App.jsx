import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';


import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Survey from "./pages/Survey";

import { Routes, Route } from 'react-router-dom';
import './styles/variables.css'; // ✅ Correct
import './styles/index.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/about" element={<About />} />
          {/* Add product detail route later */}
        </Routes>

        {/* faceted search + product grid goes here */}
        {/* checkout flow goes here, likely on its own route or view */}
      </main>
      <Footer />
    </div>
  );
}

export default App;