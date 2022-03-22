import React from "react";
import Footer from '../Footer/Footer';
import Header from "../Header/Header";
import Search from "../Search/Search";
import Cards from "../Cards/Cards";

function SavedMovies({loggedIn}) {
    return (
      <>
        <Header loggedIn={loggedIn} />
        <Search />
        <Cards cardsList="savedCards"/>
        <Footer />
      </>
    );
  }
  
  export default SavedMovies;