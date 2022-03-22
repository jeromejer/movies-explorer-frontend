import React from "react";
import './Card.css';

function Card({cardsList, title, img}) {

    const [isSavedMovie, setIsSavedMovie] = React.useState(false);
   

    const likeIcon = (
    `card__like ${isSavedMovie ? 'card__like_active' : ''}`
       ); 
    
    const deleteIcon = (
        'card__delete'
       );   

    const cardIcon = cardsList === "searchCards" ? likeIcon : deleteIcon;



    function handleLikeMovie() {
      if (!isSavedMovie) {
          setIsSavedMovie(true) 
      } else {
          setIsSavedMovie(false)
      }
    };
  
        
    return(
        <>
            <article className="card">
                <div className="card__group">
                    <div className="card__description">
                        <h2 className="card__title">{title}</h2>
                        <p className="card__duration">1ч 42м</p>
                    </div>
                    <button className={cardIcon} onClick={handleLikeMovie}></button>
                </div>
                <img className="card__img" alt="Обложка фильма" src={img}/>
            </article>

        </>
    )
}

export default Card;