import React from 'react';
import logo from '../assets/logo.png'

const About = () => {
	return (
		<div className="max-w-2xl mx-auto p-4 text-center h-full">
			<img className='w-md mx-auto' src={logo} alt="logo" />
			<h1 className="text-3xl font-bold mb-4">Acerca de Nosotros</h1>
			<p className="mb-4">
				Bienvenido a Kupo-Next, tu destino número uno para descubrir cupones y ofertas exclusivas que te permitirán ahorrar en todo lo que desees.
			</p>
			<p className="mb-4">
				En Kupo-Next, nos dedicamos a ofrecerte las mejores ofertas y descuentos en una amplia variedad de productos y servicios. Nuestro objetivo es ayudarte a ahorrar dinero sin comprometer la calidad.
			</p>
			<p>
				¡Únete a nuestra comunidad y mantente al día con las últimas ofertas y promociones! ¡Empieza a ahorrar hoy mismo con Kupo-Next!
			</p>
		</div>
	);
};

export default About;
