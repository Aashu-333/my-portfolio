import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Experience from '../components/Experience'
import Toolkit from '../components/Toolkit'
import Services from '../components/Services'
import Projects from '../components/Projects'
import About from '../components/About'
import FooterImage from '../components/FooterImage'
import Contact from '../components/Contact'


const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Experience />
      <Toolkit />
      <Services />
      <Projects />
      <About />
      <FooterImage />
      <Contact />
    </>
  )
}

export default Home
