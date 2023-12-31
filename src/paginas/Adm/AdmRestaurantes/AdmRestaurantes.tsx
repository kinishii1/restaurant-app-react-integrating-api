import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Link } from "react-router-dom";
import url from "../../../url";

function AdmRestaurantes() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    url
      .get<IRestaurante[]>("/restaurantes/")
      .then((response) => {
        setRestaurantes(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteRestaurant = ({ id }: IRestaurante) => {
    url
      .delete<IRestaurante>(`/restaurantes/${id}/`)
      .then(() => {
        const newRestaurantes = restaurantes.filter((item) => item.id !== id);
        setRestaurantes([...newRestaurantes]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Typography variant="h4" textAlign='center' sx={{mb: 5}} >Formulario de Restaurantes</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantes.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>
                  [<Link to={`/admin/restaurantes/${item.id}`}> Editar </Link>]
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteRestaurant(item)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdmRestaurantes;
