import React, { useState } from "react";

import "../../styles/utils.css";

import EventApi from "../../services/event-api";

function RemoveEvent({ user, userEvents }) {
	const [eventData, setEventData] = useState({
		eventName: "",
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

	async function remove() {
		setErrors([]);
		setSuccess("");

		// Any event was selected
		if (eventData.eventName.length === 0) {
			setErrors(["Selecione um evento para remover!"]);
			return;
		}

		// Request
		try {
			const eventApi = new EventApi();
			const eventToRemove = userEvents.find(
				item => item.name === eventData.eventName
			);

			const res = await eventApi.remove(eventToRemove._id, user.token);

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
			<h1>Remover Evento</h1>
			{userEvents.length > 0 && (
				<>
					<h2>Selecione um evento para remover</h2>
					<select
						name="eventName"
						value={eventData.eventName}
						onChange={handleEventData}
					>
						<option defaultValue hidden>
							Selecione um evento
						</option>

						{userEvents.map(event => {
							return (
								<option key={event._id}>{event.name}</option>
							);
						})}
					</select>

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

					<button className="main__button" onClick={remove}>
						Remover
					</button>
				</>
			)}
			{!userEvents.length > 0 && (
				<h1 style={{ margin: "20px 0px" }}>Você não possui eventos!</h1>
			)}
		</section>
	);
}

export default RemoveEvent;
