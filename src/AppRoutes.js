import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Navbar from "./components/navbar/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import EventsPage from "./pages/EventsPage";
import MyEventsPage from "./pages/MyEventsPage";

export const AppRoutes = () => {
	const [login, setLogin] = useState(true);
	const [user, setUser] = useState({});

	// Function that makes the navBar disapear
	function loginHandleClick(event, value) {
		if (value) {
			setLogin(value);
			return;
		}
		setLogin(!login);
	}

	function getUser(user) {
		if (user) {
			window.localStorage.setItem("user", JSON.stringify(user));
			setUser(user);
		}
	}

	function logOut() {
		window.localStorage.clear();
		setUser({});
	}

	useEffect(() => {
		const localUser = JSON.parse(window.localStorage.getItem("user"));
		if (localUser !== null) {
			setUser(localUser);
		}
	}, []);

	return (
		<BrowserRouter>
			{login && (
				<Navbar
					loginState={loginHandleClick}
					user={user}
					logOut={logOut}
				/>
			)}
			<Switch>
				<Route
					exact
					path="/"
					render={props => <HomePage user={user} />}
				/>
				<Route exact path="/events" component={EventsPage} />
				<Route
					exact
					path="/login"
					render={props => (
						<LoginPage
							loginState={loginHandleClick}
							getUser={getUser}
						/>
					)}
				/>
				<Route
					exact
					path="/register"
					render={props => (
						<RegisterPage loginState={loginHandleClick} />
					)}
				/>
				<Route
					exact
					path="/user"
					render={props => <UserPage user={user} getUser={getUser} />}
				/>

				<Route
					exact
					path="/user/events"
					render={props => (
						<MyEventsPage user={user} getUser={getUser} />
					)}
				/>
			</Switch>
		</BrowserRouter>
	);
};

export default AppRoutes;
