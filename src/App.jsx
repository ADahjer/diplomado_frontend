import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Ruteo } from "./app/utilidades/rutas/Ruteo";
import { Cabecera } from "./app/componentes/contenedor/Cabecera";
import { AuthProvider } from "./app/componentes/contenedor/Authcontext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <AuthProvider>
          <BrowserRouter>
            <Cabecera />
            <Ruteo />
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
