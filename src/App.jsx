import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import WhyUs        from './components/WhyUs'
import Services     from './components/Services'
import Gallery      from './components/Gallery'
import Testimonials from './components/Testimonials'
import Process      from './components/Process'
import FAQ          from './components/FAQ'
import LeadForm     from './components/LeadForm'
import Footer       from './components/Footer'
import FloatingWA   from './components/FloatingWA'

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <WhyUs />
        <Services />
        <Gallery />
        <Testimonials />
        <Process />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
      <FloatingWA />
    </>
  )
}
