import '../../App.css';
import Header from '../partials/header.js';
import Footer from '../partials/footer.js';
import Box from '@mui/material/Box';
import HomeAlbums from '../sub-components/homeAlbums.js';

export default function Home() {
  return (
    <Box className= 'page-container'>
      <Header />
      <HomeAlbums />
      <Footer />
    </Box>
  );
}