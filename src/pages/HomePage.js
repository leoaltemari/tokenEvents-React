import React from "react";

import Banner from "../components/homepage/Banner";
import Footer from "../components/homepage/Footer";

import "../styles/homepage.css";
import "../styles/utils.css";

function Home() {
	return (
		<main className="main__page">
			<Banner />
			<Footer />
		</main>
	);
}

export default Home;
