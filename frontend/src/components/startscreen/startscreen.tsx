import React from "react";
import type { Screen } from "../../App";
import GetStartedButton from "./getstartedbutton";
import "./startscreen.css";
import { useAuth } from "../../context/AuthContext";

export default function StartScreen(
	props: { navigate: (new_screen: Screen) => void },
) {
	const [transitioning, setTransitioning] = React.useState(false);
	const { isAuthenticated, isLoading } = useAuth();

	function goToHome() {
		if (isLoading) return; // Prevent routing while auth status is being checked
		
		setTransitioning(true);
		
		setTimeout(() => {
			if (isAuthenticated) {
				props.navigate("home");
			} else {
				const isReturningUser = localStorage.getItem("isReturningUser");
				if (isReturningUser) {
					props.navigate("login");
				} else {
					props.navigate("register");
				}
			}
		}, 1000);
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
			<GetStartedButton onClick={goToHome} />
			<div className="getstarted-subtext">Stay Protected. Always.</div>
		</div>
	);
}
