import '../../App.css';
import Header from '../partials/header.js';
import Footer from '../partials/footer.js';
// import Nav from './components/nav'
import HomeAlbums from '../sub-components/homeAlbums.js';

export default function Home() {
  return (
    <div className= 'page-container'>
      <Header />
      <HomeAlbums />
      <Footer />
    </div>
  );
}