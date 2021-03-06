import React from "react";
import BotonFav from "../../Detail/BotonFav";
import { useState } from "react";
import s from "./Cards.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Card({ name, image, description, price }) {
  const [checked, setChecked] = useState(false);

  function handleFavorite(e) {
    e.preventDefault();
    setChecked(!checked);
  }

  const navigate = useNavigate();

  function handleCard(e) {
    e.preventDefault();
    navigate("/detail/1");
  }

  return (
    <div className={s.card}>
      <img src={image} alt="img not found" width="300vw" height="250vw" />
      <div className={s.cardBody}>
        <h3>{name}</h3>
        <br />
        <h5>
          {description.length > 250
            ? description.slice(0, 250) + " [more info...]"
            : description}
        </h5>
      </div>
      <div className={s.rightGroup}>
        <div className={s.price}>
          <h3>${price}</h3>
          <h5>per Person</h5>
        </div>
        <div className={s.hide} onClick={(e) => handleFavorite(e)}>
          <BotonFav checked={checked} />
        </div>
      </div>
      <div>
        <button className={s.rectangle}>&gt;</button>
      </div>
    </div>
  );
}
