import { Button, TextField } from "@mui/material"
import { useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { log } from "console";

function FormRestaurante() {
  const [restaurante, setRestaurante] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('need to change');
    console.log(restaurante);
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField 
      value={restaurante} 
      onChange={(event) => setRestaurante(event.target.value)} 
      id="standard-basic" label="Standard" 
      variant="standard" />
      <Button type="submit" variant="text">Text</Button>
      </form>
  )
}


export default FormRestaurante