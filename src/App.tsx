import React, { type Dispatch, type SetStateAction } from "react";
import StartScreen from "./components/startscreen/startscreen";
import HomeScreen from "./components/homescreen/homescreen";
import Settings from "./components/settings/settings";
import ProfileScreen from "./components/settings/ProfileScreen";
import PrivacyScreen from "./components/settings/PrivacyScreen";
import AboutScreen from "./components/settings/AboutScreen";
import TermsScreen from "./components/settings/TermsScreen";
import ContactsScreen from "./components/contacts/ContactsScreen";
import DevicesScreen from "./components/devices/DevicesScreen";
import BottomBar from "./components/bottombar/bottombar";
import LiveStatus from "./components/homescreen/live_status/live_status";
import TopBar from "./components/topbar/topbar";
import Alerts from "./components/alerts/alerts";
import ChooseMode from "./components/choose_mode/choose_mode";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

export type Screen =
	| "start"
	| "home"
	| "alerts"
	| "contacts"
	| "settings"
	| "profile"
	| "privacy"
	| "about"
	| "terms"
	| "devices"
	| "liveStatus"
	| "chooseMode"
	| "login"
	| "register";

function GetScreen(props: {
	screens: Screen[];
	setScreens: Dispatch<SetStateAction<Screen[]>>;
	navigate: (new_screen: Screen) => void;
}) {
	switch (props.screens.at(-1)) {
		case "start":
			return <StartScreen navigate={props.navigate} />;
		case "login":
			return <Login navigate={props.navigate} />;
		case "register":
			return <Register navigate={props.navigate} />;

		case "home":
			return <HomeScreen setScreens={props.setScreens} />;
		case "alerts":
			return <Alerts />;
		case "contacts":
			return <ContactsScreen />;
		case "settings":
			return <Settings setScreens={props.setScreens} />;
		case "profile":
			return <ProfileScreen />;
		case "privacy":
			return <PrivacyScreen />;
		case "about":
			return <AboutScreen />;
		case "terms":
			return <TermsScreen />;
		case "devices":
			return <DevicesScreen />;

		case "liveStatus":
			return <LiveStatus setScreens={props.setScreens} />;
		case "chooseMode":
			return <ChooseMode />;
		default:
			return null;
	}
}

function App() {
	const [screens, setScreens] = React.useState<Screen[]>(["start"]);
	const setScreen = (new_screen: Screen) => {
		setScreens([new_screen]);
	};

	return (
		<div id="app">
			{screens.at(-1) !== "start" && screens.at(-1) !== "login" && screens.at(-1) !== "register" && (
				<TopBar screens={screens} setScreens={setScreens} />
			)}
			<GetScreen
				screens={screens}
				setScreens={setScreens}
				navigate={setScreen}
			/>
			{screens.at(-1) !== "start" && screens.at(-1) !== "login" && screens.at(-1) !== "register" && (
				<BottomBar screen={screens[0]} navigate={setScreen} />
			)}
		</div>
	);
}

export default App;
