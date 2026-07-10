import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Experience from '../components/Experience'
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
      <Services />
      <Projects />
      <About />
      <FooterImage />
      <Contact />
    </>
  )
}

export default Home
