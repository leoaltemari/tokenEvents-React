import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../utils/Input";
import UserApi from "../../services/user-api";
import "../../styles/utils.css";

function Register({ loginState }) {
	const [inputData, setInputData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState([]);
	const [success, setSuccess] = useState("");

	// Function to get input data
	function handleLogin(event) {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		setInputData(prevData => {
			return { ...prevData, [name]: value };
		});
	}

	// Function to create a new user in the DB
	async function registerUser(event) {
		setErrors([]);
		event.preventDefault();
		const userApi = new UserApi();

		// Request
		const res = await userApi.register(
			inputData.name,
			inputData.email,
			inputData.password,
			inputData.confirmPassword
		);

		// Response
		if (res.status === 0) {
			// Succes, user created
			setSuccess(res.success);
			setTimeout(() => {
				document.querySelector("#login-page").click();
			}, 3000);
		} else if (res.status === 1) {
			// Input errors
			if (res.errors) {
				const err = [];
				err.push(res.errors);

				setErrors(err);

				document
					.querySelector(".form__errors")
					.classList.add("form__errors__show");
			}
		} else {
			// Input errors
			res.errors.shift();
			setErrors(res.errors);
			document
				.querySelector(".form__errors")
				.classList.add("form__errors__show");
		}
	}

	return (
		<div className="register__content">
			<form className="login__form register__form">
				{/* Banner */}
				<div className="form__banner">
					<Link to="/">
						<img
							src={require("../../assets/logos/tevents_logo.png")}
							alt="token events logo"
							onClick={loginState}
						/>
					</Link>
					<h4>Registre-se agora</h4>
				</div>

				{/* FORM fields */}
				<div className="form__grid__fields">
					{/* NAME input */}
					<Input
						type="text"
						fieldName="Name"
						icon="user_icon"
						place="Digite seu nome completo"
						inputData={{ name: "name", value: inputData.name }}
						handleLogin={handleLogin}
					/>

					{/* EMAIL input */}
					<Input
						type="text"
						fieldName="Email"
						icon="email_icon"
						place="Digite seu email"
						inputData={{ name: "email", value: inputData.email }}
						handleLogin={handleLogin}
					/>

					{/* PASSWORD input */}
					<Input
						type="password"
						fieldName="Senha"
						icon="password_icon"
						place="Digite sua senha"
						inputData={{
							name: "password",
							value: inputData.password,
						}}
						handleLogin={handleLogin}
					/>

					{/* CONFIRM PASSWORD input */}
					<Input
						type="password"
						fieldName="Confirme a Senha"
						icon="password_icon"
						place="Confirme sua senha"
						inputData={{
							name: "confirmPassword",
							value: inputData.confirmPassword,
						}}
						handleLogin={handleLogin}
					/>
				</div>

				{/* Display ERRORS */}
				{errors.length > 0 && (
					<div className="form__errors">
						{errors.map(item => {
							return <h6 key={item}>• {item}</h6>;
						})}
					</div>
				)}

				{/* Display SUCCESS message */}
				{success.length > 0 && (
					<div className="form__success">
						<h6>{success}</h6>
					</div>
				)}

				{/* Register button */}
				<div className="form__submit">
					<button className="main__button" onClick={registerUser}>
						Registrar
					</button>
				</div>

				{/* Link to login */}
				<div className="login__register">
					<h4>Já possui uma conta?</h4>
					<h5>
						<Link to="/login">Conecte-se aqui</Link>
					</h5>
				</div>
			</form>

			{/* Externals */}
			<div className="login__bkg"></div>
			<Link to="/login" id="login-page" />
		</div>
	);
}

export default Register;
