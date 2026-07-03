import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import './styles/index.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        {/* faceted search + product grid goes here */}
        {/* checkout flow goes here, likely on its own route or view */}
      </main>
      <Footer />
    </div>
  );
}

export default App;