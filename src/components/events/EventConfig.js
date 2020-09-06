import React, { useState, useEffect } from "react";

import "../../styles/utils.css";
import "../../styles/event.css";

import EventApi from "../../services/event-api";

import Event from "../utils/Event";
import AddEvent from "./AddEvents";
import UpdateEvent from "./UpdateEvents";
import RemoveEvent from "./RemoveEvents";

function EventConfig({ user }) {
	const [userEvents, setUserEvents] = useState([]);

	useEffect(() => {
		async function getUserEvents() {
			const eventApi = new EventApi();
			try {
				if (user.token) {
					const res = await eventApi.getByUser(user._id, user.token);
					res.forEach(event => {
						event.startDate = new Date(event.startDate);
						event.finishDate = new Date(event.finishDate);
					});
					setUserEvents(res);
				}
			} catch (err) {
				console.log(err);
			}
		}
		getUserEvents();
	}, [user]);

	function showConfig(id) {
		const configItens = document.getElementsByClassName("config__item");

		if (configItens.length > 0) {
			for (let i = 0; i < configItens.length; i++) {
				if (i === id) {
					configItens[i].classList.remove("hidden");
					configItens[i].classList.add("not__hidden");
				} else {
					configItens[i].classList.add("hidden");
					configItens[i].classList.remove("not__hidden");
				}
			}
		}
	}

	return (
		<section className="config__container">
			<div className="config__buttons">
				<button className="main__button" onClick={() => showConfig(0)}>
					Adicionar Evento
				</button>
				<button className="main__button" onClick={() => showConfig(1)}>
					Atualizar Eventos
				</button>
				<button className="main__button" onClick={() => showConfig(2)}>
					Remover Eventos
				</button>
			</div>
			<AddEvent user={user} />
			<UpdateEvent user={user} userEvents={userEvents} />
			<RemoveEvent user={user} userEvents={userEvents} />

			{userEvents.length > 0 && (
				<h1 className="my__events">Meus eventos</h1>
			)}
			<section className="events__display">
				{userEvents.length > 0 &&
					userEvents.map(event => {
						return <Event eventData={event} key={event._id} />;
					})}
			</section>
		</section>
	);
}

export default EventConfig;
