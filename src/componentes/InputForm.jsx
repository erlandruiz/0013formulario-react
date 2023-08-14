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
} from "../elementos/Formularios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

export const InputForm = ({
  estado,
  cambiarEstado,
  type,
  label,
  placeholder,
  name,
  leyendaError,
  expresionRegular,
  funcion
}) => {
  const onChange = (e) => {
    cambiarEstado({ ...estado, campo: e.target.value });
  };

  const validacion = () => {
    if (expresionRegular) {
      if (expresionRegular.test(estado.campo)) {
        cambiarEstado({ ...estado, valido: "true" });
      } else {
        cambiarEstado({ ...estado, valido: "false" });
      }
    }

    if(funcion){
        funcion();
    }
  };

  return (
    <div>
      <Label htmlFor={name} valido={estado.valido}>
        {label}
      </Label>

      <GrupoInput>
        <Input
          type={type}
          placeholder={placeholder}
          id={name}
          value={estado.campo}
          onChange={onChange}
          onKeyUp={validacion}
          onBlur={validacion}
          valido={estado.valido}
        />
        {/* <FontAwesomeIcon icon={faCircleXmark} /> */}
        <IconoValidacion 
        icon={estado.valido==='true' ?faCircleCheck : faCircleXmark} 
        valido ={estado.valido} />
      </GrupoInput>
      <LeyendaError valido = {estado.valido}>{leyendaError}</LeyendaError>
    </div>
  );
};
