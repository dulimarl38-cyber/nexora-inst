import NexoraIntro from '../components/intro/NexoraIntro'
import Brand from '../components/brand/Brand'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero/Hero'
import About from '../components/sections/About'
import Solutions from '../components/sections/Solutions'
import Projects from '../components/sections/Projects'
import Process from '../components/sections/Process'
import Infrastructure from '../components/sections/Infrastructure'
import Technologies from '../components/sections/Technologies'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <>
      <NexoraIntro />
      <div id="site-content">
        <Brand />
        <main>
          <Hero />
          <About />
          <Solutions />
          <Projects />
          <Process />
          <Infrastructure />
          <Technologies />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
