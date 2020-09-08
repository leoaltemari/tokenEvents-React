import React from "react";
import { Link } from "react-router-dom";

function Footer({ user }) {
	return (
		<footer className="main__footer">
			{/* Footer link 1 */}
			<Link
				to={user.token ? "/user/events" : "/login"}
				className="footer__item"
			>
				<img
					src={require("../../assets/logos/clock_logo.png")}
					alt="sound_logo"
				/>
				<p>Crie seus eventos de maneira rápida e fácil</p>
			</Link>

			{/* Footer link 2 */}
			<Link
				to={user.token ? "/user/events" : "/login"}
				className="footer__item"
			>
				<img
					src={require("../../assets/logos/mail_logo.png")}
					alt="mail_logo"
				/>
				<p>Chame seus amigos para seus eventos e curtam juntos</p>
			</Link>

			{/* Footer link 3 */}
			<Link to="/events" className="footer__item">
				<img
					src={require("../../assets/logos/search_logo.png")}
					alt="eye_logo"
				/>
				<p>Encontre eventos que são do seu interesse</p>
			</Link>
		</footer>
	);
}

export default Footer;
