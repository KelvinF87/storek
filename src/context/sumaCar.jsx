import React, { createContext, useState } from "react";
export const SumaCarContext = createContext();
export function SumaCarContextProvider(props) {
  const [contCar, setConCar] = useState(0);
   function acualizaCar() {
	const storedData = JSON.parse(localStorage.getItem("LisCar"));
	setConCar(storedData ? storedData.length : 0);
  }
  return (
	<SumaCarContext.Provider value={{ contCar, setConCar, acualizaCar }}>
	  {props.children}
	</SumaCarContext.Provider>
  );
}
