import React, { useEffect, useState } from "react";
import { BsPlusLg, BsDashLg, BsDash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createPackage,
  getAllActivities,
  getAllDestinations,
  getTypes,
} from "../../redux/actions";
import style from "./CreatePackage.module.css";
import Dashboard from "./Dashboard";
import validationPackage from "./validationPackage.js";
import Toast from "react-bootstrap/Toast";

export default function CreatePackage() {
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);
  useEffect(() => {
    dispatch(getAllDestinations());
    dispatch(getAllActivities());
    dispatch(getTypes());
  }, [dispatch]);

  const navigate = useNavigate();

  const allDestinations = useSelector((state) => state.destinations);
  const types = useSelector((state) => state.types);

  const dataNow = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(dataNow);
  const [untilDate, setUntilDate] = useState(dataNow);

  const sortDestinations = allDestinations.sort(function (a, b) {
    if (a.name > b.name) return 1;
    if (b.name > a.name) return -1;
    return 0;
  });

  const [input, setInput] = useState({
    name: "",
    price: 0,
    description: "",
    main_image: "",
    images0: "",
    images1: "",
    images2: "",
    images: [],
    destinations: [],
    start_date: dataNow,
    end_date: dataNow,
    region: "",
    seasson: "",
    type: "",
    featured: false,
    available: true,
    on_sale: false,
  });

  const [error, setError] = useState({
    name: "",
    price: "",
    description: "",
    main_image: "",
    images0: "",
    images1: "",
    images2: "",
    featured: "",
    destinations: [],
    start_date: "",
    end_date: "",
    available: "",
    on_sale: "",
    region: "",
    seasson: "",
    type: "",
  });

  const handleAddImage = (e) => {
    e.preventDefault();
    if (input.images.length < 3) {
      setInput({ ...input, images: [...input.images, ""] });
    }
  };

  function handleRemoveImage(e) {
    e.preventDefault();
    const images = input.images;
    if (images.length > 0) images.pop();
    setInput({ ...input, images: images });
  }

  const handleSelect = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // setError(
    //   validationPackage({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
    console.log(e.target.value);
  };

  const handleSelectDestinations = (e) => {
    if (input.destinations.length <= 4) {
      if (!input.destinations.includes(e.target.value)) {
        setInput({
          ...input,
          destinations: [...input.destinations, e.target.value],
        });
        e.target.value = "default";
        console.log(e.target.value);
        // setError(
        //   validationPackage({
        //     ...input,
        //     destinations: [...input.destinations, e.target.value],
        //   })
        // );
      } else {
        e.target.value = "default";
        return alert("Ese pa??s ya fue seleccionado!");
      }
    }
  };

  const handleChangeInputs = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // setError(
    //   validationPackage({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
    console.log(e.target.value);
  };

  const handleChangeDate = (e) => {
    e.preventDefault();
    if (e.target.id === "from") {
      if (new Date(e.target.value) > new Date(untilDate)) {
        setFromDate(e.target.value);
        setUntilDate(e.target.value);
      } else {
        setFromDate(e.target.value);
      }
    } else {
      setUntilDate(e.target.value);
    }
  };

  function handleBorrarDestinations(e) {
    setInput({
      ...input,
      destinations: input.destinations.filter((i) => i !== e.target.innerText),
    });
    // setError(
    //   validationPackage({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
    console.log(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    input.images = [input.images0, input.images1, input.images2];
    input.price = parseInt(input.price);
    input.on_sale = parseInt(input.on_sale);
    input.available = input.available === "true" ? true : false;
    input.featured = input.featured === "true" ? true : false;

    const valida = validationPackage({ ...input });
    setError(valida);
    if (
      valida.name ||
      valida.price ||
      valida.description ||
      valida.main_image ||
      valida.images ||
      valida.featured ||
      valida.available ||
      valida.on_sale ||
      valida.region ||
      valida.type ||
      valida.seasson ||
      valida.destinations
    ) {
      console.log(valida);
      alert(
        "Presta mas atencion al completar el formulario y volve a intentar ;)"
      );
    } else {
      dispatch(createPackage(input));
      alert("Nuevo paquete creado..");
      setInput({
        name: "",
        price: "",
        description: "",
        main_image: "",
        images0: "",
        images1: "",
        images2: "",
        featured: "",
        destinations: [],
        start_date: "",
        end_date: "",
        available: "",
        on_sale: "",
        region: "",
        seasson: "",
        type: "",
      });
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <Dashboard />
      <div className={style.create_container}>
        <h2>Crear un Paquete</h2>
        <hr className={style.create_line} />
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={style.create_form_container}
        >
          <div className={style.create_form_container}>
            <div className={style.create_input_container}>
              {error.name && <span>{error.name}</span>}
              <label className={style.create_label}>Nombre</label>
              <input
                type="text"
                className={style.create_input}
                name="name"
                value={input.name}
                onChange={(e) => handleChangeInputs(e)}
              />
            </div>
            <div className={style.create_input_container}>
              {error.price && <span>{error.price}</span>}
              <label className={style.create_label}>Precio</label>
              <input
                value={input.price}
                name="price"
                min="1"
                step="1"
                type="number"
                className={style.create_input}
                onChange={(e) => handleChangeInputs(e)}
              />
            </div>
            <div className={style.create_textarea_container}>
              {error.description && <span>{error.description}</span>}
              <label className={style.create_label}>Descripci??n</label>
              <textarea
                name="description"
                cols="30"
                rows="10"
                className={style.create_input_textarea}
                onChange={(e) => handleChangeInputs(e)}
              ></textarea>
            </div>
            <div className={style.create_input_date_container}>
              <div className={style.create_input_date}>
                <label className={style.create_label}>Fecha de Inicio</label>
                <input
                  name="start_date"
                  type="date"
                  id="from"
                  value={fromDate}
                  min={dataNow}
                  onChange={(e) => handleChangeDate(e)}
                  className={style.create_input}
                />
              </div>
              <div className={style.create_input_date}>
                <label className={style.create_label}>Fecha de Fin</label>
                <input
                  name="end_date"
                  type="date"
                  id="until"
                  value={untilDate}
                  min={fromDate}
                  onChange={(e) => handleChangeDate(e)}
                  className={style.create_input}
                />
              </div>
            </div>
            <div className={style.create_input_container}>
              {error.on_sale && <span>{error.on_sale}</span>}
              <label className={style.create_label}>Promoci??n</label>
              <input
                value={input.on_sale}
                name="on_sale"
                className={style.create_input}
                type="number"
                min="0"
                max="100"
                step="1"
                id="on_sale"
                onChange={(e) => handleChangeInputs(e)}
              />
            </div>
            <div className={style.create_input_container}>
              {error.featured && <span>{error.featured}</span>}
              <label className={style.create_label}>Destacado</label>
              <select
                name="featured"
                onChange={(e) => handleSelect(e)}
                className={style.create_input}
              >
                <option selected={true} disabled="disabled">
                  Seleccionar si tu Paquete esta destacado...
                </option>
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className={style.create_input_container}>
              {error.available && <span>{error.available}</span>}
              <label className={style.create_label}>Stock</label>
              <select
                name="available"
                onChange={(e) => handleSelect(e)}
                className={style.create_input}
              >
                <option selected={true} disable="disabled" value="true">
                  Selecciona el stook
                </option>
                <option value="true">Verdadero</option>
                <option value="false">Falso</option>
              </select>
            </div>
            <div className={style.create_input_container}>
              {error.destinations && <span>{error.destinations}</span>}
              <label className={style.create_label}>Destinos</label>
              <select
                id="destinationsSelect"
                name="destinations"
                onChange={(e) => handleSelectDestinations(e)}
                className={style.create_input}
              >
                <option
                  value="default"
                  placeholder="Seleccionar Destinos..."
                  selected
                  disabled
                  hidden
                >
                  Seleccionar Destinos...
                </option>
                {sortDestinations?.map((el) => (
                  <option key={el.name} value={el.name}>
                    {el.name}
                  </option>
                ))}

                {/* TENEMOS QUE CREAR UNA SITUACION EN EL "handleSelectDestinations" 
                PARA MANEJAR EL CASO DE CREAR UN DESTINO NUEVO*/}
                {/* <option value="crear">"Crear un destino nuevo.."</option> */}
              </select>
            </div>

            {input.destinations
              .sort(function (a, b) {
                if (a > b) {
                  return 1;
                }
                if (b > a) {
                  return -1;
                }
                return 0;
              })
              .map((i, o) => (
                <div
                  key={"destinations" + o}
                  id="input_destinations"
                  className={style.create_destinations_items}
                  onClick={(e) => handleBorrarDestinations(e)}
                  value={i.name}
                >
                  {i}
                </div>
              ))}

            {/* Final destinos */}
            <div className={style.create_input_container}>
              {error.region && <span>{error.region}</span>}
              <label className={style.create_label}>Regi??n</label>
              <select
                name="region"
                onChange={(e) => handleSelect(e)}
                className={style.create_input}
              >
                <option selected={true} disabled="disabled">
                  Seleccionar una Regi??n...
                </option>
                <option value="Europa Occidental">Europa Occidental</option>
                <option value="Europa Central">Europa Central</option>
                <option value="Europa Oriental">Europa Oriental</option>
                <option value="Asia Oriental">Asia Oriental</option>
                <option value="Asia del Sur">Asia del Sur</option>
                <option value="Asia Sudoriental Continental">
                  Asia Sudoriental Continental
                </option>
                <option value="Norte Am??rica">Norte Am??rica</option>
                <option value="Sudam??rica">Sudam??rica</option>
                <option value="Am??rica Central">Am??rica Central</option>
              </select>
            </div>
            <div className={style.create_input_container}>
              {error.seasson && <span>{error.seasson}</span>}
              <label className={style.create_label}>Estaci??n</label>
              <select
                name="seasson"
                onChange={(e) => handleSelect(e)}
                className={style.create_input}
              >
                <option selected={true} disabled="disabled">
                  Seleccionar una Estaci??n...
                </option>
                <option value="Verano">Verano</option>
                <option value="Oto??o">Oto??o</option>
                <option value="Invierno">Invierno</option>
                <option value="Primavera">Primavera</option>
                <option value="Especial">Especial</option>
              </select>
            </div>
            <div className={style.create_input_container}>
              {error.type && <span>{error.type}</span>}
              <label className={style.create_label}>Tipo</label>
              <select
                name="type"
                onChange={(e) => handleSelect(e)}
                className={style.create_input}
              >
                <option selected={true} disabled="disabled">
                  Seleccionar un tipo para tu Paquete...
                </option>
                {types?.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
            <div
              id="create_images"
              className={style.create_input_images_container}
            >
              <div className={style.create_input_images}>
                {error.main_image && <span>{error.main_image}</span>}
                <label className={style.create_label}>Im??gen Principal</label>
                <input
                  onChange={(e) => handleChangeInputs(e)}
                  name="main_image"
                  type="text"
                  className={style.create_input}
                  value={input.main_image}
                />
                <button
                  onClick={(e) => handleAddImage(e)}
                  className={style.create_input_btn}
                >
                  <BsPlusLg />
                </button>
                <button
                  onClick={(e) => handleRemoveImage(e)}
                  className={style.create_input_btn}
                >
                  <BsDashLg />
                </button>
              </div>
              {input.images?.map((i, index) => {
                return (
                  <div key={i + index} className={style.create_input_images}>
                    <label className={style.create_label}>
                      Im??gen {index + 1}
                    </label>
                    <input
                      id={index}
                      name={"images" + index}
                      value={input["images" + index]}
                      type="text"
                      onChange={(e) => handleChangeInputs(e)}
                      className={style.create_input}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className={style.create_input_container}>
            <button
              type="submit"
              disabled={
                !input.name.length &&
                !input.price.length &&
                !input.description.length &&
                !input.main_image.length &&
                !input.images0.length &&
                !input.images1.length &&
                !input.images2.length &&
                !input.destinations.length
                  ? true
                  : false
              }
              className={style.create_btn}
              id="create"
            >
              Crear Paquete
            </button>

            <span className={style.create_term}>
              Al presionar 'Crear Paquete' usted acepta los T??rminos de BLABLA y
              la Pol??tica de Privacidad
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
