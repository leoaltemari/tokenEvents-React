import React, { useState, useEffect } from "react";

import Event from "../utils/Event";
import UserApi from "../../services/user-api";


// Component to Display user Invitations
function ShowInvitations({ user, invitations, getUser }) {
	const [invitationsList, setInvitationsList] = useState([]);

	useEffect(() => {
		if (invitations.length !== 0) {
			invitations.forEach(invitation => {
				invitation.event.startDate = invitation.event.startDate.toString();
				invitation.event.finishDate = invitation.event.finishDate.toString();
				invitation.event.startDate = new Date(
					invitation.event.startDate.substring(
						0,
						invitation.event.startDate.length - 1
					)
				);
				invitation.event.finishDate = new Date(
					invitation.event.finishDate.substring(
						0,
						invitation.event.finishDate.length - 1
					)
				);
			});

			invitations = invitations.filter(invitation => {
				return (
					invitation.accepted === "unset" ||
					invitation.accepted === "true"
				);
			});

			setInvitationsList(invitations);
		}
	}, [invitations]);

	async function setStatus(status, eventId) {
		try {
			const userApi = new UserApi();

			const res = await userApi.setStatus(status, eventId, user);
			res.user.token = user.token;
			getUser(res.user);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<h1 className="events__display__title border__title">
				Convites Recebidos
			</h1>
			<section className="events__display">
				{invitationsList.length > 0 &&
					invitationsList.map(invitation => {
						return (
							<div
								className="invitation"
								key={invitation.event._id}
							>
								<h3>Evento de: {invitation.whoInvited.name}</h3>
								{invitation.accepted !== "true" && (
									<div className="invitation__grid__buttons">
										<button
											className="main__button invitation__button accept"
											onClick={() =>
												setStatus(
													1,
													invitation.event._id
												)
											}
										>
											Aceitar
										</button>
										<button
											className="main__button invitation__button refuse"
											onClick={() =>
												setStatus(
													0,
													invitation.event._id
												)
											}
										>
											Recusar
										</button>
									</div>
								)}
								{invitation.accepted === "true" && (
									<h3 style={{ color: "#589dd4" }}>
										Convite Aceito
									</h3>
								)}

								<div
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<Event
										eventData={invitation.event}
										key={invitation.event_id}
									/>
								</div>
							</div>
						);
					})}
				{invitationsList.length === 0 && (
					<h1>Você não recebeu nenhum convite</h1>
				)}
			</section>
		</>
	);
}

export default ShowInvitations;
