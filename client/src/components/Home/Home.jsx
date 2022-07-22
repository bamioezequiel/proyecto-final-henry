import React from "react";
import Hero from "../Hero/Hero";
import style from './Home.module.css';
import imgTest from './../../assets/img/background-image2 2.jpg';
import CardGeneric from "../Cards/CardGeneric/CardGeneric";

export default function Home() {
    return (
        <div className={style.home_container}>
            <Hero />
            <div className={style.cards_container}>
                {
                    // Para probar como se ven las cartas de descatados/ofertas
                    Array.from({ length: 3 }).map((_, idx) => (
                        <CardGeneric feature={{
                            id: 1,
                            img: imgTest,
                            title: 'Package Title (10 days)',
                            description: 'Starting from $$$ per person'
                        }} />
                    ))
                }   
            </div>            
            <br /><br /><br /><br /><br />
        </div>
    )
}
