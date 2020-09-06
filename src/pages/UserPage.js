import React from "react";

import "../styles/utils.css";

import UserData from "../components/user/UserData";

import NotFound from "../components/utils/NotFound";
function UserPage({ user, getUser }) {
	return (
		<main className="main__page">
			{!user.token ? (
				<NotFound />
			) : (
				<UserData user={user} getUser={getUser} />
			)}
		</main>
	);
}

export default UserPage;
