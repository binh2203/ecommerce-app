
import AutoSlider from '../components/AutoSlider';
import './Home.css';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Footer from '../components/Footer';
function Home() {

  return (
    <div className="home-container">
      <Navbar />
      <AutoSlider />
      <Products />
      <Footer />
    </div>
  );
}

export default Home;
