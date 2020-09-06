import React from "react";

import "../styles/utils.css";

import EventConfig from "../components/events/EventConfig";

function MyEventsPage({ user, getUser }) {
	return (
		<main className="main__page">
			<EventConfig user={user} />
		</main>
	);
}

export default MyEventsPage;
