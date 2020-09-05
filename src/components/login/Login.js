import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../utils/Input";
import UserApi from "../../services/user-api";
import "../../styles/utils.css";

function Login({ loginState, getUser }) {
	const [inputData, setInputData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	function handleLogin(event) {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		setInputData(prevData => {
			return { ...prevData, [name]: value };
		});
	}

	async function authenticate(event) {
		setErrors({});
		event.preventDefault();
		const userApi = new UserApi();
		const res = await userApi.login(inputData.email, inputData.password);
		if (res.status === 0) {
			getUser(res.user);
			loginState();
			document.querySelector("#user-page").click();
		} else {
			if (res.errors) {
				setErrors(res.errors);
				document
					.querySelector(".form__errors")
					.classList.add("form__errors__show");
			}
		}
	}

	return (
		<div className="login__content">
			<form className="login__form">
				<div className="form__banner">
					<Link to="/">
						<img
							src={require("../../assets/logos/tevents_logo.png")}
							alt="token events logo"
							onClick={loginState}
						/>
					</Link>
					<h4>Conecte-se com a sua conta</h4>
				</div>
				{errors.length && (
					<div className="form__errors">
						<h6>{errors}</h6>
					</div>
				)}
				<Input
					type="text"
					fieldName="Email"
					icon="email_icon"
					place="Digite seu email"
					inputData={{ name: "email", value: inputData.email }}
					handleLogin={handleLogin}
				/>
				<Input
					type="password"
					fieldName="Senha"
					icon="password_icon"
					place="Digite sua senha"
					inputData={{ name: "password", value: inputData.password }}
					handleLogin={handleLogin}
				/>
				<div className="form__submit">
					<button className="main__button" onClick={authenticate}>
						Login
					</button>
				</div>
				<div className="login__register">
					<h4>Não possui uma conta?</h4>
					<h5>
						<Link to="/register">Cadastre-se Aqui</Link>
					</h5>
				</div>
			</form>
			<div className="login__bkg"></div>
			<Link to="/user" id="user-page" />
		</div>
	);
}

export default Login;
