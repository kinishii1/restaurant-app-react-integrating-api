import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdmRestaurantes from "./paginas/Adm/AdmRestaurantes/AdmRestaurantes";
import FormRestaurantes from "./paginas/Adm/AdmRestaurantes/FormRestaurantes";
import BasePage from "./paginas/BasePageAdmin";
import AdmPratos from "./paginas/Adm/AdmPratos/AdmPratos";
import FormPrato from "./paginas/Adm/AdmPratos/FormPratos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<BasePage/>}>
        <Route path="restaurantes" element={<AdmRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormRestaurantes />} />
        <Route path="restaurantes/:id" element={<FormRestaurantes />} />
        <Route path='pratos' element={<AdmPratos/>}/>
        <Route path='pratos/novo' element={<FormPrato/>}/>
      </Route>
    </Routes>
  );
}

export default App;
