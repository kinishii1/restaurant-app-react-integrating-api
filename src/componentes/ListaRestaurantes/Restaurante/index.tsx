import axios from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';
import IPrato from '../../../interfaces/IPrato';

interface RestauranteProps {
  restaurante: IRestaurante
  id: number
}


const Restaurante = ({ restaurante, id}: RestauranteProps) => {
  console.log(id)
  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/restaurantes/${id}/pratos/`)
      .then(response => {
        console.log(response.data)
        setPratos(response.data);
      })
      .catch(error => console.log(error))
  }, [id])

  
  return (<section className={estilos.Restaurante}>
    <div className={estilos.Titulo}>
      <h2>{restaurante.nome}</h2>
    </div>
    <div>
      {pratos?.map(item => <Prato prato={item} key={item.id} />)}
    </div>
  </section>)
}

export default Restaurante