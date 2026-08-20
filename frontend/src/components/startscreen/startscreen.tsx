import React from "react";
import type { Screen } from "../../App";
import GetStartedButton from "./getstartedbutton";
import "./startscreen.css";
import { useAuth } from "../../context/AuthContext";

export default function StartScreen(props: {navigate: React.Dispatch<React.SetStateAction<Screen>>}) {
	const [transitioning, setTransitioning] = React.useState(false);
	const { isAuthenticated, isLoading } = useAuth();

	function goToHome() {
		if (isLoading) return;

		setTransitioning(true);
		setTimeout(() => {
			if (isAuthenticated) {
                console.log("Routing to Home");
				props.navigate("home");
			} else {
                console.log("Routing to Register");
				props.navigate("register");
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
			{isLoading ? (
				<div style={{ color: "white", marginTop: "20px" }}>Loading...</div>
			) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
				    <GetStartedButton onClick={goToHome}/>
                    <div 
                        style={{ color: '#aaa', cursor: 'pointer', textDecoration: 'underline', fontSize: '14px' }}
                        onClick={() => {
                            if (!isAuthenticated) props.navigate("login");
                            else props.navigate("home");
                        }}
                    >
                        Already have an account? Login
                    </div>
                </div>
			)}
			<div className="getstarted-subtext">Stay Protected. Always.</div>
		</div>
	);
}
