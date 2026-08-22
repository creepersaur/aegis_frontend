import "./homescreen.css"
import TopBar from "../topbar/topbar";
import ProtectionStatus from "./protection_status/status";
import SensorList from "./sensors/sensor_list";
import type { Screen } from "../../App";
import type { Dispatch, SetStateAction } from "react";

export default function HomeScreen(props: {
	screens: Screen[];
	setScreens: Dispatch<SetStateAction<Screen[]>>;
}) {
	return <>
		<TopBar screens={props.screens} setScreens={props.setScreens} />
		<ProtectionStatus/>
		<SensorList/>
	</>
}
