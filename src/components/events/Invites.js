import React, { useState } from "react";

import "../../styles/utils.css";

import Input from "../utils/Input";
import UserApi from "../../services/user-api";

function Invite({ user, userEvents, getUser }) {
	const [inviteData, setInviteData] = useState({
		eventName: "",
		friendEmail: "",
	});

	const [errors, setErrors] = useState([]);
	const [success, setSuccess] = useState("");

	function handleEventData(event) {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		setInviteData(prevData => {
			return { ...prevData, [name]: value };
		});
	}

	async function invite() {
		setErrors([]);
		setSuccess("");

		// Any event was selected
		if (inviteData.eventName.length === 0) {
			setErrors(["Selecione um evento para convidar!"]);
			return;
		}

		// Any  email was selected
		if (inviteData.friendEmail.length === 0) {
			setErrors(["Preencha o email do amigo!"]);
			return;
		}

		// Request
		try {
			const userApi = new UserApi();
			const eventToInvite = userEvents.find(
				item => item.name === inviteData.eventName
			);

			const res = await userApi.invite(
				user._id,
				eventToInvite._id,
				inviteData.friendEmail,
				user.token
			);

			if (res.status === 0) {
				setSuccess(res.success);
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
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<section className="event__config config__item hidden">
			<h1>Convidar amigos</h1>
			{userEvents.length > 0 && (
				<>
					<h2>Selecione um evento para convidar amigos</h2>
					<select
						name="eventName"
						value={inviteData.eventName}
						onChange={handleEventData}
					>
						<option defaultValue hidden>
							Selecione um evento para convidar um amigo
						</option>

						{userEvents.map(event => {
							return (
								<option key={event._id}>{event.name}</option>
							);
						})}
					</select>

					<Input
						type="text"
						fieldName="Email do(a) amigo(a)"
						icon="user_icon"
						place="Email do(a) amigo(a)"
						inputData={{
							name: "friendEmail",
							value: inviteData.friendEmail,
						}}
						handleLogin={handleEventData}
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

					<button className="main__button" onClick={invite}>
						Convidar
					</button>
				</>
			)}
			{!userEvents.length > 0 && (
				<h1 style={{ margin: "20px 0px" }}>Você não possui eventos!</h1>
			)}
		</section>
	);
}

export default Invite;
