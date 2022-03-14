import React from "react";
import Promo from '../Promo/Promo';
import About from '../About/About';
import Tech from '../Tech/Tech';
import Student from '../Student/Student';
import Footer from '../Footer/Footer';
import Header from "../Header/Header";

function Main() {
    return (
      <>
        <Header  color="header__color_pink"/>
        <Promo />
        <About />
        <Tech />
        <Student />
        <Footer />
      </>
    );
  }
  
  export default Main;