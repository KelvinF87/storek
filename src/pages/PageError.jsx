import logo from '../assets/Logo.png'
import { useNavigate } from "react-router";
const Error404 = () => {
	const navigate = useNavigate()
	return (
	  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
		<img className='w-70.5' src={logo} alt="Logo de kupo-next" />
		<h1 className="text-6xl font-bold text-gray-800">404</h1>
		<p className="mt-4 text-2xl text-gray-600">Página no encontrada</p>
		<p className="mt-2 text-gray-500">Lo sentimos, la página que estás buscando no existe.</p>
		<button
		  onClick={()=>navigate("/")}
		  className="mt-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
		>
		  Volver al inicio
		</button>
	  </div>
	);
  };
  
  export default Error404;
  