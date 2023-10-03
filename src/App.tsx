import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdmRestaurantes from './paginas/Adm/AdmRestaurantes/AdmRestaurantes';
import FormRestaurantes from './paginas/Adm/AdmRestaurantes/FormRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdmRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormRestaurantes />} />
    </Routes>
  );
}

export default App;
