import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from './../Hero.module.css';

export default function FilterSearch({ regions }) {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [fromDate, setFromDate] = useState('')
    const [untilDate, setUntilDate] = useState('')
    const destinations = [];

    const handleChange = (e) => {
        // dispatch(searchPackages(e.target.value));
        
    }

    const handleClick = (e) => {
        e.preventDefault();
        // actions filter
        // dispatch()
        console.log(fromDate)
        console.log(untilDate)
        navigate("/search");
    }

    return (
        <form className={style.form_container}>
            <select id="destinations" onChange={ (e) => handleChange(e) } className={style.form_select}>
                <option value="all">All destinations</option>
                {
                    regions?.map( (r) => <option key={`restination-${r}`} value={r}>
                        { r }
                    </option> )
                }
            </select>
            <input type="date"
                    value={fromDate}
                    min={new Date('yyyy-mm-dd')}
                    onChange={ (e) => setFromDate(e.target.value) }
                    className={style.form_date}/>
            <input type="date"
                    value={untilDate}
                    min={fromDate}
                    onChange={ (e) => setUntilDate(e.target.value) }
                    className={style.form_date}/>

            <button onClick={ (e) => handleClick(e) } className={style.form_button}>
                Buscar
            </button>
        </form>
    )
}