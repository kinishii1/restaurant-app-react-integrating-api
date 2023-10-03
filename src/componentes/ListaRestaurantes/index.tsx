import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState<string>("");

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/"
      )
      .then((response) => {
        setRestaurantes(response.data.results);

        if (response.data.next) setProximaPagina(response.data.next);
      })
      .catch((error) => console.log(error));
  }, []);

  const seeMore = () => {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then((response) => {
        setRestaurantes([...restaurantes, ...response.data.results]);
        setProximaPagina(response.data.next);
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} id={item.id}/>
      ))}
      {proximaPagina && <button onClick={seeMore}>Carregar mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
