import React from "react";
import { Link } from "react-router-dom";

import "../../styles/utils.css";

function Banner({ user }) {
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
					<Link to={user.token ? "/user/events" : "/login"}>
						<button className="main__button">
							CRIE SEUS EVENTOS
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}
export default Banner;
