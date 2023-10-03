import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import url from "../../../url/index";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

// {
//   "nome": "string",
//   "tag": "Doces",
//   "descricao": "string",
//   "restaurante": 0
// }

function FormPrato() {
  const [namePrato, setNamePrato] = useState("");
  const [descPrato, setDescPrato] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [tag, setTag] = useState("");
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    url
      .get<{ tags: ITag[] }>("/tags/")
      .then((response) => {
        setTags(response.data.tags);
      })
      .catch((error) => console.log(error));

    url
      .get<IRestaurante[]>("/restaurantes/")
      .then((response) => {
        setRestaurantes(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nome", namePrato);
    formData.append("descricao", descPrato);
    formData.append("tag", tag);
    formData.append("restaurante", restaurante);
    if (imagem) {
      formData.append("imagem", imagem);
    }

    url
      .request({
        url: "/pratos/",
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => {
        setDescPrato("");
        setNamePrato("");
        setTag("");
        setRestaurante("");
        setImagem(null);
        alert("Prato cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImagem(event.target.files[0]);
    } else {
      setImagem(null);
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
      <Typography variant="h4" mb={5}>
        Formulario de Restaurantes
      </Typography>
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
          value={namePrato}
          onChange={(event) => setNamePrato(event.target.value)}
          id="standard-basic"
          label="Nome do Prato"
          variant="standard"
          fullWidth
          required
          margin="dense"
        />
        <TextField
          value={descPrato}
          onChange={(event) => setDescPrato(event.target.value)}
          id="standard-basic"
          label="Descrição do Prato"
          variant="standard"
          fullWidth
          required
          margin="dense"
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(event) => setTag(event.target.value as string)}
          >
            {tags.map((item) => (
              <MenuItem key={item.id} value={item.value}>
                {item.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel id="select-restaurantes">Restaurante</InputLabel>
          <Select
            labelId="select-restaurantes"
            value={restaurante}
            onChange={(event) => setRestaurante(event.target.value as string)}
          >
            {restaurantes.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type="file" onChange={selectFile} />

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

export default FormPrato;
