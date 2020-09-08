import React, { useState, useEffect } from "react";

import "../../styles/utils.css";
import "../../styles/event.css";

import EventApi from "../../services/event-api";

import Event from "../utils/Event";
import AddEvent from "./AddEvents";
import UpdateEvent from "./UpdateEvents";
import RemoveEvent from "./RemoveEvents";
import InviteEvent from "./Invites";
import ShowInvitations from "./ShowInvitations";

function EventConfig({ user, getUser }) {
	const [userEvents, setUserEvents] = useState([]);

	// Request to the API the user events data
	useEffect(() => {
		async function getUserEvents() {
			const eventApi = new EventApi();
			try {
				// Request
				if (user.token) {
					const res = await eventApi.getByUser(user._id, user.token);

					// Changes the date to Date type
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

	// Animation to show and hide the selected page by the user.
	// The pages are: ADD event, UPDATE event, REMOVE event, INVITE friend
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
			
				{/* Buttons to select the page */}
				<div className="config__grid__buttons">
					<button
						className="main__button"
						onClick={() => showConfig(0)}
					>
						Adicionar Evento
					</button>
					<button
						className="main__button"
						onClick={() => showConfig(1)}
					>
						Atualizar Eventos
					</button>
				</div>
				<div className="config__grid__buttons">
					<button
						className="main__button"
						onClick={() => showConfig(2)}
					>
						Remover Eventos
					</button>
					<button
						className="main__button"
						onClick={() => showConfig(3)}
					>
						Convidar amigos
					</button>
				</div>
			</div>

			{/* Pages hidden, it show just the page that the user selected */}
			<AddEvent user={user} />
			<UpdateEvent user={user} userEvents={userEvents} />
			<RemoveEvent user={user} userEvents={userEvents} />
			<InviteEvent user={user} userEvents={userEvents} />
			
			{/* Show user invitations */}
			<ShowInvitations
				user={user}
				invitations={user.invitations}
				getUser={getUser}
			/>

			{/* Shows user Events */}
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
