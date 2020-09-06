import React from "react";

import Banner from "../components/homepage/Banner";
import Footer from "../components/homepage/Footer";

import "../styles/homepage.css";
import "../styles/utils.css";

function Home({ user }) {
	return (
		<main className="main__page">
			<Banner user={user} />
			<Footer />
		</main>
	);
}

export default Home;
