import React from "react";
import Footer from '../Footer/Footer';
import Header from "../Header/Header";
import Search from "../Search/Search";
import Cards from "../Cards/Cards";

function Main() {
    return (
      <>
        <Header />
        <Search />
        <Cards />
        <Footer />
      </>
    );
  }
  
  export default Main;