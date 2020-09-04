import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";

export const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
			</Switch>
		</BrowserRouter>
	);
};

export default AppRoutes;
