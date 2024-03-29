import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import style from "./User.module.css";
import s from "./PopUps.module.css";
import Card from "../Favorites/FavoriteCard.jsx";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { getAllFavorites, getFavoritesLocalStorage, getPackageById } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

export default function FavoritesPopOut({ showProfile, setShowProfile, divBackground }) {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const { isAuthenticated, getAccessTokenSilently, } = useAuth0();
  const user = useSelector( (state) => state.user );
  let favorites = [];
  let stateFavorites = useSelector((state) => state.favorites);
  let stateFavoritesLocalStorage = useSelector((state) => state.favoritesLocalStorage);
  if(!isAuthenticated) {
    favorites = [...stateFavoritesLocalStorage];
  } else {
    favorites = [...stateFavorites];
  }

  useEffect( async () => {
    if(!isAuthenticated) {
      dispatch(getFavoritesLocalStorage());
    } else{
      const token = await getAccessTokenSilently();
      dispatch(getAllFavorites(token, user.email))
    }
  }, [dispatch])
  
  
  function handleFavClick(e) {
    e.preventDefault();
    if(document.getElementById('cart_container').classList.contains(`${s.open_favorite}`)) {
      document.getElementById('cart_container').classList.add(`${s.user_profile_container}`);
      document.getElementById('cart_container').classList.remove(`${s.open_favorite}`);
      setIsActive(true);
    } else if(document.getElementById('cart_container').classList.contains(`${s.open_favorite}`)) {
      setIsActive(false);
    } else {
      setIsActive(!isActive);
    }
  }

  function handleClickFav(e){
    setShowProfile(false);
    divBackground?.classList?.remove(`${s.is_active}`);
  }

  return (
    !showProfile ? null :
    // <div onClick={(e) => handleFavClick(e)} className={s.favIcon}>
    //   <div>
    //     <AiOutlineHeart />
    //   </div>
    <div className={s.popUpInside}>
      <div id="favorite_container" className={s.open_favorite}>
        <div>
          <h3 className={s.favTitle}>Mis Favoritos ({favorites ? favorites.length : '0'})</h3>
          <hr />
          <div className={style.user_profile_link}>
            {favorites?.length ?
              favorites?.map((p) => {
                return (
                  <div key={p.id}>
                    <Card
                      name={p.name}
                      image={p.image || p.main_image}
                      price={p.price}
                      id={p.id}
                      key={p.id}
                      popUp={"favorites"}
                      handleClickFav={handleClickFav}
                    />
                  </div>
                );
              }) : 
              <div className={s.noPaq}>
                <div className={s.sadFace}>
                    <HiOutlineEmojiSad />
                  </div>
                  <p className={s.vacioPaq}>Tu favoritos se encuentra vacío</p>
              </div>
              }
          </div>
          <hr />
          <Link to="/favorites">
            <button className={s.allFavorite_btn} onClick={handleClickFav}>Todos mis Favoritos</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
