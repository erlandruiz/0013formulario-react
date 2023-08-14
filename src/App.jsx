import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import {
  Formulario,
  Label,
  GrupoInput,
  Input,
  LeyendaError,
  IconoValidacion,
  ContenedorTerminos,
  ContenedorBotonCentrado,
  Boton,
  MensajeError,
  MensajeExito,
} from "./elementos/Formularios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { InputForm } from "./componentes/InputForm";

const App = () => {
  const [usuario, setUsuario] = useState({ campo: "", valido: null });
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [password, setPassword] = useState({ campo: "", valido: null });
  const [password2, setPassword2] = useState({ campo: "", valido: null });
  const [correo, setCorreo] = useState({ campo: "", valido: null });
  const [telefono, setTelefono] = useState({ campo: "", valido: null });
  const [terminos, setTerminos] = useState(false);
  const [formularioValido, setFormularioValido] = useState(null);

  const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };

  const validarPassword2 = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        setPassword2((presvState) => {
          return { ...presvState, valido: "false" };
        });
      } else {
        setPassword2((presvState) => {
          return { ...presvState, valido: "true" };
        });
      }
    }
  };

  const onChangeTerminos = (e)=>{
    setTerminos(e.target.checked)
  }

  const onSubmit = (e)=>{
    e.preventDefault();

    if (
      usuario.valido === 'true' &&
      nombre.valido === 'true' &&
      password.valido === 'true' &&
      password2.valido === 'true' &&
      correo.valido === 'true' &&
      telefono.valido === 'true' &&
      terminos
    ) {
      setFormularioValido(true);
      setUsuario({campo:'', valido: null});
      setNombre({campo:'', valido: null});
      setPassword({campo:'', valido: null});
      setPassword2({campo:'', valido: null});
      setCorreo({campo:'', valido: null});
      setTelefono({campo:'', valido: null});
    } else{
      setFormularioValido(false)
    }
  }

  return (
    <>
      <main>
        <Formulario action="" onSubmit={onSubmit}>
          {/* Para el usuario */}
          <InputForm
            estado={usuario}
            cambiarEstado={setUsuario}
            type="text"
            label="Usuario"
            placeholder="Usuario"
            name="usuario"
            leyendaError="El usuario debe de ser de 4 a 16 digtos y solo puede contener numeros, letras y guion bajo"
            expresionRegular={expresiones.usuario}
          />

          {/* Para el nombre */}
          <InputForm
            estado={nombre}
            cambiarEstado={setNombre}
            type="text"
            label="Nombre"
            placeholder="Erlandberger"
            name="nombre"
            leyendaError="El usuario solo puede contener letras y espacios"
            expresionRegular={expresiones.nombre}
          />

          {/* Contraseña */}

          <InputForm
            estado={password}
            cambiarEstado={setPassword}
            type="password"
            label="Contraseña"
            name="password1"
            leyendaError="La contraseña  tiene que ser de 4 a 12 digitos"
            expresionRegular={expresiones.password}
          />

          {/* Conraseña2 */}
          <InputForm
            estado={password2}
            cambiarEstado={setPassword2}
            type="password"
            label="Reeptir Contraseña"
            name="password2"
            leyendaError="Ambas contraseñas deben ser iguales"
            funcion={validarPassword2}
          />

          {/* Correo */}

          <InputForm
            estado={correo}
            cambiarEstado={setCorreo}
            type="email"
            label="Correo Electrónico"
            placeholder="Erland@hot.com"
            name="correo"
            leyendaError="La correo solo puede contener letras, numeros, puntos "
            expresionRegular={expresiones.correo}
          />

          {/* Telefono */}

          <InputForm
            estado={telefono}
            cambiarEstado={setTelefono}
            type="text"
            label="Teléfono"
            placeholder="7888585"
            name="telefono"
            leyendaError="La telefono solo puede contener numeros y el maximo es de 14 numeros "
            expresionRegular={expresiones.telefono}
          />

          <ContenedorTerminos>
            <Label>
              <input
                type="checkbox"
                name="terminos"
                id="terminos"
                checked={terminos}
                onChange={onChangeTerminos}
              />
              Acepto los Terminos y Condiciones
            </Label>
          </ContenedorTerminos>

          {formularioValido === false  && (
            <MensajeError>
              <p>
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <b>Error:</b> Por favor rellena el formulario correctamente.
              </p>
            </MensajeError>
          )}

          <ContenedorBotonCentrado>
            <Boton type="submit">Enviar</Boton>
            {formularioValido === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
          </ContenedorBotonCentrado>
        </Formulario>
      </main>
    </>
  );
};

export default App;
