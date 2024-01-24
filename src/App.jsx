import {useEffect} from 'react';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Testimonials from './components/Testimonials';

function App() {
  //scroll to top after every refresh
  useEffect(() => {
    scrollTo(top, {behaviour: 'smooth'});
  }, []);

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen">
        <Navbar />
        {/* Hero Section */}
        <section className="hero bg-cover bg-center h-screen flex items-center bg-hero">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">
              Your Health, Our Priority
            </h1>
            <p className="text-lg mb-8">
              Leading Physiotherapy Services Tailored for You
            </p>
            <a
              href="#booking"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">
              Book a Consultation
            </a>
          </div>
        </section>

        {/*form section*/}

        <section id="booking" className="w-full py-16">
          <div className="w-full mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Book a Consultation
            </h2>
            <BookingForm />
          </div>
        </section>

        <Testimonials />

        <Footer />
      </div>
    </>
  );
}

export default App;
