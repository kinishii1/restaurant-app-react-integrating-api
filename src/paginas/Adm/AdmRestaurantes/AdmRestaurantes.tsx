import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import axios from "axios";

function AdmRestaurantes() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
      axios.get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
      .then(response => {
          setRestaurantes(response.data)
      })
      .catch(error => console.log(error))
  }
  , [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            restaurantes.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nome}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdmRestaurantes;
