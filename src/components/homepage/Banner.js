import React from "react";

import "../../styles/utils.css";

function Banner() {
	return (
		<section className="home__banner">
			<div className="banner__effect__top"></div>
			<div className="banner__effect__bottom"></div>
			<div className="banner__content">
				<h1>Sobre nós</h1>
				<p>
					Somos uma empresa que trabalha com agendamento dos seus
					eventos, que busca sempre trazer a melhor qualidade e
					conforto para você, seja em uma festa um show ou festivais.
				</p>
				<div className="banner__button">
					<button className="main__button">CRIE SEUS EVENTOS</button>
				</div>
			</div>
		</section>
	);
}
export default Banner;
