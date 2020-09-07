import React, { useState } from "react";

import "../../styles/user.css";
import "../../styles/utils.css";

import Input from "../utils/Input";
import UserApi from "../../services/user-api";

function UserData({ user, getUser }) {
	const [updateData, setUpdateData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState([]);
	const [success, setSuccess] = useState("");

	function handleUpdate(event) {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		setUpdateData(prevData => {
			return { ...prevData, [name]: value };
		});
	}

	async function updateUser(event) {
		setErrors([]);
		setSuccess("");
		event.preventDefault();
		const userApi = new UserApi();
		const res = await userApi.update(
			updateData.name,
			updateData.email,
			updateData.password,
			updateData.confirmPassword,
			user.token,
			user._id
		);

		if (res.status === 0) {
			setSuccess(res.success);

			const currToken = user.token;
			const currInvitations = user.invitations;

			const newUser = await userApi.getUser(user._id);

			newUser.token = currToken;
			newUser.invitations = currInvitations;
			getUser(newUser);
		} else if (res.status === 1) {
			if (res.errors) {
				const err = [];
				err.push(res.errors);
				setErrors(err);

				document
					.querySelector(".form__errors")
					.classList.add("form__errors__show");
			}
		} else {
			setErrors(res.errors);
			document
				.querySelector(".form__errors")
				.classList.add("form__errors__show");
		}
	}

	return (
		<section className="userdata">
			<aside className="user__bkg bkg__left"></aside>
			<main className="user__content">
				<div className="user__config">
					<h3>Deseja alterar alguma informação sua?</h3>
					<Input
						type="text"
						fieldName="Name"
						icon="user_icon"
						place="Digite seu nome completo"
						inputData={{ name: "name", value: updateData.name }}
						handleLogin={handleUpdate}
					/>
					<Input
						type="text"
						fieldName="Email"
						icon="email_icon"
						place="Digite seu email"
						inputData={{ name: "email", value: updateData.email }}
						handleLogin={handleUpdate}
					/>
					<Input
						type="password"
						fieldName="Senha"
						icon="password_icon"
						place="Digite sua senha"
						inputData={{
							name: "password",
							value: updateData.password,
						}}
						handleLogin={handleUpdate}
					/>
					<Input
						type="password"
						fieldName="Confirme a Senha"
						icon="password_icon"
						place="Confirme sua senha"
						inputData={{
							name: "confirmPassword",
							value: updateData.confirmPassword,
						}}
						handleLogin={handleUpdate}
					/>
					{errors.length > 0 && (
						<div className="form__errors">
							{errors.map(item => {
								return <h6 key={item}>• {item}</h6>;
							})}
						</div>
					)}
					{success.length > 0 && (
						<div className="form__success">
							<h6>{success}</h6>
						</div>
					)}
					<div className="form__submit">
						<button className="main__button" onClick={updateUser}>
							Atualizar
						</button>
					</div>
				</div>
			</main>
			<aside className="user__bkg bkg__right"></aside>
		</section>
	);
}

export default UserData;
