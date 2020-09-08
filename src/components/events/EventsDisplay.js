import React, { useState, useEffect } from "react";

import Event from "../utils/Event";
import EventApi from "../../services/event-api";


// Component to Display ALL user events
function EventsDisplay({ selectedDate }) {
	const [eventsList, setEventsList] = useState([]);

	useEffect(() => {
		const eventApi = new EventApi();
		async function getAllEvents() {
			try {
				let res;
				if (!selectedDate.length > 0) {
					res = await eventApi.getAll();
				} else {
					res = await eventApi.getByDate(selectedDate);
				}

				res.data.forEach(event => {
					event.startDate = new Date(
						event.startDate.substring(0, event.startDate.length - 1)
					);
					event.finishDate = new Date(
						event.finishDate.substring(
							0,
							event.finishDate.length - 1
						)
					);
				});

				setEventsList(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		getAllEvents();
	}, [selectedDate]);

	return (
		<section className="events__display">
			{eventsList.length > 0 &&
				eventsList.map(event => {
					return <Event eventData={event} key={event._id} />;
				})}
			{eventsList.length === 0 && (
				<h1>Nenhum evento encontrado nesse dia</h1>
			)}
		</section>
	);
}

export default EventsDisplay;
