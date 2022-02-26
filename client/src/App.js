import './App.css';
import Header from './components/partials/header';
import Nav from './components/nav'
import Footer from './components/partials/footer';
import Home from './components/pages/home';

function App() {
  return (
    <div className= 'page-container'>
      <Header />
      <Nav />
      <Home />
      <Footer />
    </div>

  );
}

export default App;
