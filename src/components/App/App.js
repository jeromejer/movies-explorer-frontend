import './App.css';
import React from "react";
import Hero from '../Hero/Hero';
import About from '../About/About';
import Tech from '../Tech/Tech';
import Student from '../Student/Student';
import Footer from '../Footer/Footer';


function App() {
  return (
    <div className="app">
      <Hero />
      <About />
      <Tech />
      <Student />
      <Footer />
    </div>
  );
}

export default App;
