import React, { useState } from "react";

import "../../styles/utils.css";

import EventApi from "../../services/event-api";
import Input from "../utils/Input";

function UpdateEvent({ user, userEvents }) {
	const [eventData, setEventData] = useState({
		eventName: "",
		name: "",
		description: "",
		startDate: "",
		finishDate: "",
		startHour: "",
		finishHour: "",
	});

	const [errors, setErrors] = useState([]);
	const [success, setSuccess] = useState("");

	function handleEventData(event) {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		setEventData(prevData => {
			return { ...prevData, [name]: value };
		});
	}

	async function update() {
		setErrors([]);
		setSuccess("");

		// Any event was selected
		if (eventData.eventName.length === 0) {
			setErrors(["Selecione um evento para atualizar!"]);
			return;
		}

		// Request
		try {
			const eventApi = new EventApi();
			const eventToUpdate = userEvents.find(
				item => item.name === eventData.eventName
			);
			const res = await eventApi.update(
				eventToUpdate._id,
				eventData,
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
			<h1>Atualizar Evento</h1>
			{userEvents.length > 0 && (
				<>
					<h2>Selecione um evento para atualizar</h2>
					<select
						name="eventName"
						value={eventData.eventName}
						onChange={handleEventData}
					>
						<option defaultValue hidden>
							Selecione um evento
						</option>
						;
						{userEvents.map(event => {
							return (
								<option key={event._id}>{event.name}</option>
							);
						})}
					</select>
					<Input
						type="text"
						fieldName="Nome"
						icon="event_icon"
						place="Nome do evento"
						inputData={{ name: "name", value: eventData.name }}
						handleLogin={handleEventData}
					/>
					<Input
						type="text"
						fieldName="Descrição"
						icon="description_icon"
						place="Descrição do evento"
						inputData={{
							name: "description",
							value: eventData.description,
						}}
						handleLogin={handleEventData}
					/>
					<div className="event__config__date">
						<Input
							type="date"
							fieldName="Data de início"
							icon="clock_icon"
							place="Data de início"
							inputData={{
								name: "startDate",
								value: eventData.startDate,
							}}
							handleLogin={handleEventData}
						/>
						<Input
							type="number"
							fieldName="Hora de início"
							icon="clock_icon"
							place="Hora de início"
							inputData={{
								name: "startHour",
								value: eventData.startHour,
							}}
							handleLogin={handleEventData}
						/>
					</div>
					<div className="event__config__date">
						<Input
							type="date"
							fieldName="Data de término"
							icon="clock_icon"
							place="Data de término"
							inputData={{
								name: "finishDate",
								value: eventData.finishDate,
							}}
							handleLogin={handleEventData}
						/>
						<Input
							type="number"
							fieldName="Hora de término"
							icon="clock_icon"
							place="Hora de término"
							inputData={{
								name: "finishHour",
								value: eventData.finishHour,
							}}
							handleLogin={handleEventData}
						/>
					</div>

					{errors.length > 0 && (
						<div className="form__errors">
							{errors.map(item => {
								return <h6>• {item}</h6>;
							})}
						</div>
					)}
					{success.length > 0 && (
						<div className="form__success">
							<h6>{success}</h6>
						</div>
					)}
					<button className="main__button" onClick={update}>
						Atualizar
					</button>
				</>
			)}
			{!userEvents.length > 0 && (
				<h1 style={{ margin: "20px 0px" }}>Você não possui eventos!</h1>
			)}
		</section>
	);
}

export default UpdateEvent;
