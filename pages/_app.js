// pages/_app.js
import '../styles/globals.css';
import { SocialMediaProvider } from '../context/SocialMediaContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

function MyApp({ Component, pageProps }) {
  // Extract socialLinks from pageProps if available
  const { socialLinks = [], ...restPageProps } = pageProps;
  
  return (
    <SocialMediaProvider initialSocialLinks={socialLinks}>
      <Header />
      <Component {...restPageProps} />
      <Footer />
    </SocialMediaProvider>
  );
}

export default MyApp;