import React, { useState } from "react";

import "../styles/event.css";
import "../styles/utils.css";

import EventsDisplay from "../components/events/EventsDisplay";
import DateSelect from "../components/events/DateSelect";

function EventsPage() {
	const [selectedDate, setSelectedDate] = useState("");

	function getDate(date) {
		if (date) {
			const newDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
			setSelectedDate(newDate);
		}
	}

	return (
		<main className="main__page">
			<DateSelect getDate={getDate} />
			<h1 className="events__display__title">Eventos</h1>
			<h1 className="events__display__title events__display__date">
				{selectedDate}
			</h1>
			<EventsDisplay selectedDate={selectedDate} />
		</main>
	);
}

export default EventsPage;
