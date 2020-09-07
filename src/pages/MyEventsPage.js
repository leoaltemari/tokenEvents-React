import React from "react";

import "../styles/utils.css";

import EventConfig from "../components/events/EventConfig";
import NotFound from "../components/utils/NotFound";

function MyEventsPage({ user, getUser }) {
	return (
		<main className="main__page">
			{user.token ? (
				<EventConfig user={user} getUser={getUser} />
			) : (
				<NotFound />
			)}
		</main>
	);
}

export default MyEventsPage;
