import React, { useEffect, useState } from "react";
import { BsWindowSidebar } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { borrarPaquete, cleanAllPackage, getAllPackage, patchPackage } from "../../redux/actions";
import Dashboard from "./Dashboard";
import { MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import s from "./Table.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2'
import Loading from "../Loading/Loading";

export default function ListPackages() {
  const dispatch = useDispatch();
  const allPackages = useSelector((state) => state.allPackages);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently} = useAuth0();
  
  const handleBorrar = async (id, nombre) => {
    // console.log(e);
    Swal.fire({
      title: `Esta seguro que desea eliminar el paquete ${nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then( async (result) => {
      if (result.isConfirmed) {
        await dispatch(getAllPackage(10000));
        const token = await getAccessTokenSilently()
        dispatch(borrarPaquete(id, token))
        Swal.fire(
          `Paquete: ${id} | ${nombre}.`,
          'Eliminado exitosamente!',
          'success'
        )
      }
    })
  };

  useEffect(() => {
    if (!allPackages.length) {
      setLoading(true);
      dispatch(getAllPackage(1000));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const handlePatchPackage = (e, p) => {
    e.preventDefault();
    let type = e.target.id;
    Swal.fire({
      title: `Esta seguro que desea cambiar la propiedad ${type}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cambiar'
    }).then( async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const token = await getAccessTokenSilently();
        switch(type) {
          case 'destacado':
            await dispatch(patchPackage(p.id, token, {featured: !p.featured, available: p.available, on_sale: p.on_sale}))
            break;
          case 'disponible':
            await dispatch(patchPackage(p.id, token, {featured: p.featured, available: !p.available, on_sale: p.on_sale}))
          break;
        }
        dispatch(cleanAllPackage());
        setTimeout(() => {
          dispatch(getAllPackage(1000));
          setLoading(false);
        }, 0);
        Swal.fire(
          `La propiedad '${type}' de ${p.name}.`,
          'fue cambiada exitosamente!',
          'success'
          )
        }
      })
   
  }

  return (
    loading ? <Loading />
    : <div>
      <Dashboard />
      <div className={s.dashboard_container}>
        <div className={s.tbl_container}>
          <div class={s.table_wrapper}>
            <table class={s.fl_table}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Destacado</th>
                  <th>Disponible</th>
                  <th>Promoción</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {allPackages.length &&
                  allPackages.map((p) => {
                    return (
                      <tr key={"packagesList" + p.name}>
                        <td>{p.id}</td>
                        <td>
                        <Link
                            to={`/detail/${p.id}`}
                            className={s.fl_table_btn}
                          >
                            {p.name}
                          </Link>
                          </td>
                        <td>${p.price}</td>
                        <td onClick={ (e) => handlePatchPackage(e, p) }>
                          {p.featured ? (
                            <div id='destacado' className={s.fl_table_true}>true</div>
                          ) : (
                            <div id='destacado' className={s.fl_table_false}>false</div>
                          )}
                        </td>
                        <td onClick={ (e) => handlePatchPackage(e, p) }>
                          {p.available ? (
                            <div id='disponible' className={s.fl_table_true}>true</div>
                          ) : (
                            <div id='disponible' className={s.fl_table_false}>false</div>
                          )}
                        </td>
                        <td>%{p.on_sale}</td>
                        <td>
                          <NavLink
                            to={`/dashboard/modifyPackage/${p.id}`}
                            className={s.fl_table_btn}
                          >
                            <AiFillEdit />
                          </NavLink>
                        </td>
                        <td>
                          
                          <button
                            onClick={(e) => handleBorrar(p.id, p.name)}
                            className={s.fl_table_btn}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
