import React, { type Dispatch, type SetStateAction } from "react";
import StartScreen from "./components/startscreen/startscreen";
import HomeScreen from "./components/homescreen/homescreen";
import RegisterScreen from "./components/register/Register";
import LoginScreen from "./components/login/Login";
import { AuthProvider } from "./context/AuthContext";

export type Screen = "start" | "home" | "register" | "login"

function GetScreen(props: {
	screen: Screen, setScreen: Dispatch<SetStateAction<Screen>>
}) {
	switch (props.screen) {
		case "start": return <StartScreen navigate={props.setScreen}/>
		case "home": return <HomeScreen navigate={props.setScreen}/>
		case "register": return <RegisterScreen navigate={props.setScreen}/>
		case "login": return <LoginScreen navigate={props.setScreen}/>
	}
}

function App() {
	const [screen, setScreen] = React.useState<Screen>("start");

	return (
		<AuthProvider>
			<div id="app">
				<GetScreen screen={screen} setScreen={setScreen}/>
			</div>
		</AuthProvider>
	);
}

export default App;
