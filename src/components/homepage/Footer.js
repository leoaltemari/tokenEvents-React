import React from "react";

function Footer() {
	return (
		<footer className="main__footer">
			<div className="footer__item">
				<img
					src={require("../../assets/logos/clock_logo.png")}
					alt="sound_logo"
				/>
				<p>Crie seus eventos de maneira rápida e fácil</p>
			</div>
			<div className="footer__item">
				<img
					src={require("../../assets/logos/mail_logo.png")}
					alt="mail_logo"
				/>
				<p>Chame seus amigos para seus eventos e curtam juntos</p>
			</div>
			<div className="footer__item">
				<img
					src={require("../../assets/logos/search_logo.png")}
					alt="eye_logo"
				/>
				<p>Encontre eventos que são do seu interesse</p>
			</div>
		</footer>
	);
}

export default Footer;
