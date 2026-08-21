import React, { type Dispatch, type SetStateAction } from "react";
import StartScreen from "./components/startscreen/startscreen";
import HomeScreen from "./components/homescreen/homescreen";
import Settings from "./components/settings/settings";
import BottomBar from "./components/bottombar/bottombar";

export type Screen = "start" | "home" | "alerts" | "contacts" | "settings";

function GetScreen(props: {
	screen: Screen;
	setScreen: Dispatch<SetStateAction<Screen>>;
}) {
	switch (props.screen) {
		case "start":
			return <StartScreen navigate={props.setScreen} />;

		case "home":
			return <HomeScreen />;
		case "alerts":
			return <HomeScreen />;
		case "contacts":
			return <HomeScreen />;
		case "settings":
			return <Settings />;
	}
}

function App() {
	const [screen, setScreen] = React.useState<Screen>("start");

	return (
		<div id="app">
			<GetScreen screen={screen} setScreen={setScreen} />
			{screen !== "start" && (
				<BottomBar screen={screen} navigate={setScreen} />
			)}
		</div>
	);
}

export default App;
