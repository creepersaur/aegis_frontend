import React, { type Dispatch, type SetStateAction } from "react";
import StartScreen from "./components/startscreen/startscreen";
import HomeScreen from "./components/homescreen/homescreen";

export type Screen = "start" | "home" | "alerts" | "contacts" | "settings"

function GetScreen(props: {
	screen: Screen, setScreen: Dispatch<SetStateAction<Screen>>
}) {
	switch (props.screen) {
		case "start": return <StartScreen navigate={props.setScreen}/>
		case "home": return <HomeScreen screen={props.screen} navigate={props.setScreen}/>
	}
}

function App() {
	const [screen, setScreen] = React.useState<Screen>("start");

	return <div id="app">
		<GetScreen screen={screen} setScreen={setScreen}/>
	</div>
}

export default App;
