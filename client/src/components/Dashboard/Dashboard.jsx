import React, { useEffect, useState } from "react";
import style from "./Dashboard.module.css";
import { NavLink } from "react-router-dom";
import {
  getAllActivities,
  getAllPackage,
  getUsers,
} from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";
import ModalCategoria from "./ModalCategoria";
import ModalCategoriaElimnar from "./ModalCategoriaModificar";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleShowCrear = () => setShow(true);

  const [showEliminar, setShowEliminar] = useState(false);
  const handleShowEliminar = () => setShowEliminar(true);

  useEffect(() => {
    dispatch(getAllActivities());
    dispatch(getAllPackage(1000));
    dispatch(getUsers(1000));
  }, [dispatch]);

  return (
    <div className={style.dashboard_container}>
      <div className={style.dashboard_panel}>
        <div className={style.dashboard_panel_title}>
          <h1>Dashboard</h1>
          <hr className={style.create_line} />
        </div>
        <NavLink to="/dashboard/packages" className={style.links_item}>
          Crear paquete
        </NavLink>
        <NavLink to="/dashboard/activities" className={style.links_item}>
          Crear actividad
        </NavLink>
        <div className={style.links_item} onClick={handleShowCrear}>
          Crear categoria
        </div>
        <NavLink to="/dashboard/listPackages" className={style.links_item}>
          Lista paquete
        </NavLink>
        <NavLink to="/dashboard/listActivities" className={style.links_item}>
          Lista de actividades
        </NavLink>
        <NavLink to="/dashboard/listCategories" className={style.links_item}>
          Lista de categorias
        </NavLink>
        <NavLink to="/dashboard/listUsers" className={style.links_item}>
          Lista de usuarios
        </NavLink>
        <ModalCategoria
          show={show}
          setShow={setShow}
          // setInput={setInput}
          // input={input}
        />
      </div>
    </div>
  );
}
