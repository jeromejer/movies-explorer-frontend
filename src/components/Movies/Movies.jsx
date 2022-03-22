import React from "react";
import Footer from '../Footer/Footer';
import Header from "../Header/Header";
import Search from "../Search/Search";
import Cards from "../Cards/Cards";


function Movies({loggedIn}) {


    return (
      <>
        <Header loggedIn={loggedIn}/>
        <Search />
        <Cards cardsList="searchCards" />
        <Footer />
      </>
    );
  }
  
  export default Movies;