import React from "react";
import Footer from '../Footer/Footer';
import Header from "../Header/Header";
import Search from "../Search/Search";
import Cards from "../Cards/Cards";


function Movies({loggedIn, cards}) {


    return (
      <>
        <Header loggedIn={loggedIn}/>
        <Search />
        <Cards cardsList="searchCards" cards={cards} />
        <Footer />
      </>
    );
  }
  
  export default Movies;