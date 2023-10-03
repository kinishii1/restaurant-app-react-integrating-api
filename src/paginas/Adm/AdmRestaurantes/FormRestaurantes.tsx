import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";
import url from "../../../url/index";

function FormRestaurante() {
  const [restaurante, setRestaurante] = useState("");

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      url
        .get<IRestaurante>(`restaurantes/${id}/`)
        .then((response) => setRestaurante(response.data.nome))
        .catch((error) => console.log(error));
    }
  }, [id]);

  const createRestaurant = () => {
    url
      .post<IRestaurante>("restaurantes/", {
        nome: restaurante,
      })
      .then(() => alert("Restaurante cadastrado com sucesso!"))
      .catch((error) => console.log(error));
  };

  const updateRestaurant = () => {
    url
      .put<IRestaurante>(`/restaurantes/${id}/`, {
        nome: restaurante,
      })
      .then(() => alert("Restaurante atualizado com sucesso!"))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id) {
      updateRestaurant();
    } else {
      createRestaurant();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" mb={5}>Formulario de Restaurantes</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          gap: "20px",
        }}
      >
        <TextField
          value={restaurante}
          onChange={(event) => setRestaurante(event.target.value)}
          id="standard-basic"
          label="Nome do Restaurante"
          variant="standard"
          fullWidth
          required
        />
        <Button
          sx={{
            marginTop: 1,
            marginBottom: 1,
          }}
          fullWidth
          type="submit"
          variant="text"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default FormRestaurante;
