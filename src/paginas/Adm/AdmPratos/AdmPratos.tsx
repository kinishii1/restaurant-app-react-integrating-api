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
import IPrato from "../../../interfaces/IPrato";
import { Link } from "react-router-dom";
import url from "../../../url";

function AdmPratos() {
  const [Pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    url
      .get<IPrato[]>("/pratos/")
      .then((response) => {
        setPratos(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deletePlate = ({ id }: IPrato) => {
    url
      .delete<IPrato>(`/pratos/${id}/`)
      .then(() => {
        const newPratos = Pratos.filter((item) => item.id !== id);
        setPratos([...newPratos]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" sx={{ mb: 5 }}>
        Formulario de Pratos
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Pratos.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.tag}</TableCell>
                <TableCell>
                  <a href={item.imagem} target="_blank" rel="noreferrer">
                    Imagem
                  </a>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deletePlate(item)}
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

export default AdmPratos;
