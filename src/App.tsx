import React, { type Dispatch, type SetStateAction } from "react";
import StartScreen from "./components/startscreen/startscreen";
import HomeScreen from "./components/homescreen/homescreen";
import Settings from "./components/settings/settings";
import BottomBar from "./components/bottombar/bottombar";
import LiveStatus from "./components/homescreen/live_status/live_status";

export type Screen = "start" | "home" | "alerts" | "contacts" | "settings" | "liveStatus";

function GetScreen(props: {
	screens: Screen[];
	setScreens: Dispatch<SetStateAction<Screen[]>>;
	navigate: (new_screen: Screen) => void,
}) {
	switch (props.screens.at(-1)) {
		case "start":
			return <StartScreen navigate={props.navigate} />;

		case "home":
			return (
				<HomeScreen
					screens={props.screens}
					setScreens={props.setScreens}
				/>
			);
		case "alerts":
			return (
				<HomeScreen
					screens={props.screens}
					setScreens={props.setScreens}
				/>
			);
		case "contacts":
			return (
				<HomeScreen
					screens={props.screens}
					setScreens={props.setScreens}
				/>
			);
		case "settings":
			return (
				<Settings
					screens={props.screens}
					setScreens={props.setScreens}
				/>
			);

		case "liveStatus":
			return (
				<LiveStatus
					screens={props.screens}
					setScreens={props.setScreens}
				/>
			);
	}
}

function App() {
	const [screens, setScreens] = React.useState<Screen[]>(["start"]);
	const setScreen = (new_screen: Screen) => {
		setScreens([new_screen])
	};

	return (
		<div id="app">
			<GetScreen screens={screens} setScreens={setScreens} navigate={setScreen} />
			{screens.at(-1) !== "start" && (
				<BottomBar screen={screens[0]} navigate={setScreen} />
			)}
		</div>
	);
}

export default App;
