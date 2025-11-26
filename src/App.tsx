
import React from 'react';
import Scene from './components/Scene';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Accommodations from './components/Accommodations';
import Reviews from './components/Reviews';
import Guide from './components/Guide';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen text-slate-800 font-sans selection:bg-forest-200 selection:text-forest-900">
      <Scene />
      <Navigation />
      
      <main>
        <Hero />
        <Accommodations />
        <Reviews />
        <Guide />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
