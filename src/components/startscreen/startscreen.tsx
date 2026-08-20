import React from "react";
import type { Screen } from "../../App";
import GetStartedButton from "./getstartedbutton";
import "./startscreen.css";

export default function StartScreen(props: {navigate: React.Dispatch<React.SetStateAction<Screen>>}) {
	const [transitioning, setTransitioning] = React.useState(false);

	function goToHome() {
		setTransitioning(true);
		setTimeout(() => props.navigate("home"), 1000);
	}

	return (
		<div className="homescreen">
			<img
				className="aegis-logo"
				src="/aegis_logo.png"
				alt="aegis logo"
			/>
			<div className="logo-subtext">Detect. Protect. Respond.</div>
			<img
				className={`aegis-icon ${transitioning ? "transitioning" : ""}`}
				src="/Aegis GIF.gif"
				alt="aegis icon gif"
			/>
			<GetStartedButton onClick={goToHome}/>
			<div className="getstarted-subtext">Stay Protected. Always.</div>
		</div>
	);
}
