import React from 'react';
import { useDispatch } from 'react-redux';
import { cleanPackageById, getCartLocalStorage, getFavoritesLocalStorage, getPackageById } from '../../redux/actions';
import s from './Remove.module.css';
import BotonFav from '../Detail/BotonFav'

export default function RemoveFavorite({ id, popUp, componente }){
	const dispatch = useDispatch();

	const handleRemove = (e) => {
	 	e.preventDefault();
		if(popUp === 'cart'){
			let cart = JSON.parse(localStorage.getItem('cart'));
    		let remCart = cart.filter((c) => {return c.paquete.id !== id});
      		localStorage.setItem('cart', JSON.stringify(remCart));
    		dispatch(getCartLocalStorage());
		} else {		
			let favorites = JSON.parse(localStorage.getItem('favorites'));
    		let remFav = favorites.filter((f) => f.id !== id );
      		localStorage.setItem('favorites', JSON.stringify(remFav));
			dispatch(cleanPackageById());
			dispatch(getPackageById(id));
			dispatch(getFavoritesLocalStorage());
		}	
	}

	return(
			componente === 'favoriteList' ?
			<a className={s.addRem} onClick={(e) => handleRemove(e)}><BotonFav checked={true} componente={componente}/></a> :
			<a className={s.addRem} onClick={(e) => handleRemove(e)}>Remove</a>
	)
}