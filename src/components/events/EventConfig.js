import React, { useState, useEffect } from "react";

import "../../styles/utils.css";

import AddEvent from "./AddEvents";
import UpdateEvent from "./UpdateEvents";
import EventApi from "../../services/event-api";

function EventConfig({ user }) {
	const [userEvents, setUserEvents] = useState([]);

	useEffect(() => {
		async function getUserEvents() {
			const eventApi = new EventApi();
			try {
				if (user.token) {
					const res = await eventApi.getByUser(user._id, user.token);
					setUserEvents(res);
				}
			} catch (err) {
				console.log(err);
			}
		}
		getUserEvents();
	}, [user]);

	return (
		<section className="config__container">
			<AddEvent user={user} />
			{/* <UpdateEvent user={user} userEvents={userEvents} /> */}
		</section>
	);
}

export default EventConfig;
