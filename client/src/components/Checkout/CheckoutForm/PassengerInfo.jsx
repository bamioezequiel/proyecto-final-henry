import Accordion from "react-bootstrap/Accordion";
import s from "./CheckoutPassengers.module.css";
import React, { useState, useEffect } from "react";

export default function PassengerInfo({ cart }) {
  const [input, setInput] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    numberDni: "",
    gender: "",
    birthdate: "",
    id: "",
  });

  useEffect(() => {
    return () => {
        localStorage.remove("passenger")
        setInput({
            firstName: "",
            middleName: "",
            lastName: "",
            numberDni: "",
            gender: "",
            birthdate: "",
            id: "",
          });
    }
  }, [])

  function handlePassenger(e, i) {
    e.preventDefault();
    setInput({
      ...input,
      id: i,
      [e.target.name]: e.target.value,
    });

    // console.log(input);
  }

  function handleNextPassenger(e, index) {
    e.preventDefault();
    let passenger = JSON.parse(localStorage.getItem("passenger")) || [];
    let isMatch = false;
      for(let i = 0; i < passenger.length; i++) {
        if(passenger[i].id === index) {
          isMatch = true;
          setInput({...passenger[i]})
          return;
        }
      }
      if(input.firstName && input.lastName && !isMatch) {        
        if (!localStorage.getItem("passenger")) {
          let passenger = [];
          passenger.push(input);
          localStorage.setItem("passenger", JSON.stringify(passenger));
        } else {
          let passenger = JSON.parse(localStorage.getItem("passenger"));
          let match = false;
          for(let i = 0; i < passenger.length; i++) {
            console.log(passenger[i].id, index )
            if(passenger[i].id !== index ) {
                passenger.push(input);
                localStorage.setItem("passenger", JSON.stringify(passenger));
                //   match = true;
              break;
            }
          }
        //   if(!match) {
            // passenger.push(input);
            // localStorage.setItem("passenger", JSON.stringify(passenger));
        //   } 
        }

        // let passenger = JSON.parse(localStorage.getItem("passenger"));
        // let title = `Pasajero #${index + 1}: ` + passenger[index - 1].firstName + " " + passenger[index - 1].lastName;
        // document.getElementById(`titleP${index}`).innerText = title;

        setInput({
          firstName: "",
          middleName: "",
          lastName: "",
          numberDni: "",
          gender: "",
          birthdate: "",
          id: "",
        });
      }
  }

  function handleSelect(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return cart.map((p) => (
    <div className={s.eachAccordion}>
      <Accordion defaultActiveKey={0}>
        <h4>{p.paquete.name}</h4>
        {new Array(parseInt(p.cantidad)).fill(true).map((el, i) => {
          return (
            <Accordion.Item eventKey={i}>
              <Accordion.Header onClick={(e) => handleNextPassenger(e, i)}>
                <p id={`titleP${i}`}>Pasajero #{i+1}: </p>
              </Accordion.Header>
              <Accordion.Body>
                <div className={s.firstRow}>
                  <div>
                    <label className={s.profile_label}>Nombre</label>
                    <input
                      type="text"
                      name='firstName'
                      onChange={(e) => handlePassenger(e, i)}
                      value={input.firstName}
                      className={s.profile_input}
                    />
                  </div>
                  <div>
                    <label className={s.profile_label}>Segundo Nombre</label>
                    <input
                      type="text"
                      name='middleName'
                      value={input.middleName}
                      onChange={(e) => handlePassenger(e, i)}
                      className={s.profile_input}
                    />
                  </div>
                  <div>
                    <label className={s.profile_label}>Apellido</label>
                    <input
                      type="text"
                      name='lastName'
                      value={input.lastName}
                      onChange={(e) => handlePassenger(e, i)}
                      className={s.profile_input}
                    />
                  </div>
                </div>
                <div className={s.firstRow}>
                  <div>
                    <label className={s.profile_label}>
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      name='birthdate'
                      value={input.birthdate}
                      onChange={(e) => handlePassenger(e, i)}
                      className={s.profile_input}
                    />
                  </div>
                  <div>
                    <label className={s.profile_label}>Sexo</label>
                    <select>
                      <option selected hidden>
                        Seleccionar
                      </option>
                      <option value="Femenino">Femenino</option>
                      <option value="Masculino">Masculino</option>
                      <option value="No Binario">No Binario</option>
                    </select>
                  </div>
                  <div>
                    <label className={s.profile_label}>
                      Número de DNI/Pasaporte
                    </label>
                    <input
                      type="number"
                      name='numberDni'
                      value={input.numberDni}
                      onChange={(e) => handlePassenger(e, i)}
                      className={s.profile_input}
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  ));
}

/* 
cart.length === 1 ? (
    <Accordion defaultActiveKey={0}>
      <h2>{cart[0].paquete.name}</h2>
      {new Array(cart[0].cantidad).fill(true).map((el, i) => {
        return (
          <Accordion.Item eventKey={i}>
            <Accordion.Header onClick={(e) => handlePassenger(e, i)} id="titleP">
              Pasajero #{i + 1}:{" "}
            </Accordion.Header>
            <Accordion.Body>
              <div className={s.firstRow}>
                <div>
                  <label className={s.profile_label}>Nombre</label>
                  <input type="text" name="name" className={s.profile_input} />
                </div>
                <div>
                  <label className={s.profile_label}>Segundo Nombre</label>
                  <input
                    type="text"
                    name="middleName"
                    className={s.profile_input}
                  />
                </div>
                <div>
                  <label className={s.profile_label}>Apellido</label>
                  <input
                    type="text"
                    name="lastName"
                    className={s.profile_input}
                  />
                </div>
              </div>
              <div className={s.firstRow}>
                <div>
                  <label className={s.profile_label}>Fecha de Nacimiento</label>
                  <input
                    type="date"
                    name="birthdate"
                    className={s.profile_input}
                  />
                </div>
                <div>
                  <label className={s.profile_label}>Sexo</label>
                  <select name="gender" onChange={(e) => handleSelect(e)}>
                    <option selected hidden>
                      Seleccionar
                    </option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="NoBinario">No Binario</option>
                  </select>
                </div>
                <div>
                  <label className={s.profile_label}>
                    Número de DNI/Pasaporte
                  </label>
                  <input
                    type="number"
                    name="numberDni"
                    className={s.profile_input}
                  />
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  ) : (

*/









/* import Accordion from 'react-bootstrap/Accordion';
import s from './CheckoutPassengers.module.css';
import React, { useState } from 'react';

export default function PassengerInfo({ cart }) {
    const [input, setInput] = useState({
		firstName: '',
		middleName: '',
		lastName: '',
		numberDni: '',
		gender: '',
        birthdate: '',
        id: '',
	});

    function handlePassenger(e, i){
        e.preventDefault();
        setInput({
            ...input,
            id: i + 1,
            [e.target.name]: e.target.value
        }) 

        console.log(input)
       
    }

    function nextPassenger(e, i){
        e.preventDefault();   
        let passenger = JSON.parse(localStorage.getItem('passenger'));
        let title = `Pasajero #${i + 1}: `; //CHEQUEADO QUE ES SOLO I
        // if(title.length < 15){ 
            title += ' ' + passenger[i]?.firstName + ' ' + passenger[i]?.lastName;
            console.log(title)
            document.getElementById(`titleP${i + 1}`).innerHTML = title;
        // };


        // console.log(title)        
        if(!localStorage.getItem('passenger')){
            let passenger = [];
            passenger.push(input);
            localStorage.setItem('passenger', JSON.stringify(passenger));
        } else {
            let passenger = JSON.parse(localStorage.getItem('passenger'));
            // console.log(passenger)
            passenger.forEach((p) => p.id != i+1 && passenger.push(input))
            localStorage.setItem('passenger', JSON.stringify(passenger))
        }
        
        
        
        setInput({
            firstName: '',
		    middleName: '',
		    lastName: '',
		    numberDni: '',
		    gender: '',
            birthdate: '',
            id: ''
        })
        
        passenger?.forEach((p) => parseInt(p.id) === i + 1 && setInput({ ...p }))
        console.log(passenger);
        
    }
    

    function handleSelect(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }



  return (
    cart.length === 1 ?
    <Accordion defaultActiveKey={0}>
        <h2>{cart[0].paquete.name}</h2>
        {   
        new Array(parseInt(cart[0].cantidad)).fill(true).map( (el, i) => {
            return <Accordion.Item eventKey={i}>
                <Accordion.Header onClick={(e) => nextPassenger(e, i)}><p id={`titleP${i + 1}`}>Pasajero #{i + 1}:</p></Accordion.Header>
                <Accordion.Body>
                    <div className={s.firstRow}>
                        <div>
                            <label className={s.profile_label}>Nombre</label>
                            <input type='text' name='firstName' value={input.firstName} className={s.profile_input} onChange={(e) => handlePassenger(e, i)}/>
                        </div>
                        <div>
                            <label className={s.profile_label}>Segundo Nombre</label>
                            <input type='text' name='middleName' className={s.profile_input} onChange={(e) => handlePassenger(e, i)}/>
                        </div>
                        <div>
                            <label className={s.profile_label}>Apellido</label>
                            <input type='text' name='lastName' value={input.lastName} className={s.profile_input} onChange={(e) => handlePassenger(e, i)}/>
                        </div>
                    </div>
                    <div className={s.firstRow}>
                        <div>
                            <label className={s.profile_label}>Fecha de Nacimiento</label>
                            <input type='date' name='birthdate' className={s.profile_input} onChange={(e) => handlePassenger(e, i)}/>
                        </div>
                        <div>
                            <label className={s.profile_label}>Sexo</label>
                            <select name='gender' onChange={(e) => handleSelect(e)}>
                                <option selected hidden>Seleccionar</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Masculino">Masculino</option>
                                <option value="NoBinario">No Binario</option>
                            </select>
                        </div>
                        <div>
                        <label className={s.profile_label}>Número de DNI/Pasaporte</label>
                            <input type='number' name='numberDni' className={s.profile_input} onChange={(e) => handlePassenger(e, i)}/>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>  
        })}
    </Accordion> :
cart.map((p) =>
<div className={s.eachAccordion}>
<Accordion defaultActiveKey={0}>
    <h4>{p.paquete.name}</h4>
{new Array(parseInt(p.cantidad)).fill(true).map( (el, i) => {
    return <Accordion.Item eventKey={i}>
        <Accordion.Header id='titleP'>Pasajero #{i + 1}: </Accordion.Header>
        <Accordion.Body>
            <div className={s.firstRow}>
                <div>
                    <label className={s.profile_label}>Nombre</label>
                    <input type='text' value={input.name} className={s.profile_input} />
                </div>
                <div>
                    <label className={s.profile_label}>Segundo Nombre</label>
                    <input type='text' className={s.profile_input} />
                </div>
                <div>
                    <label className={s.profile_label}>Apellido</label>
                    <input type='text' className={s.profile_input} />
                </div>
            </div>
            <div className={s.firstRow}>
                <div>
                    <label className={s.profile_label}>Fecha de Nacimiento</label>
                    <input type='date' className={s.profile_input} />
                </div>
                <div>
                    <label className={s.profile_label}>Sexo</label>
                    <select>
                    <option selected hidden>Seleccionar</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="No Binario">No Binario</option>
                    </select>
                </div>
                <div>
                <label className={s.profile_label}>Número de DNI/Pasaporte</label>
                    <input type='number' className={s.profile_input} />
                </div>
            </div>
        </Accordion.Body>
    </Accordion.Item>  
})}
</Accordion>
</div>
  )
)}
 */