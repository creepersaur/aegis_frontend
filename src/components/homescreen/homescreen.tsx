import "./homescreen.css"
import ProtectionStatus from "./protection_status/status";
import SensorList from "./sensors/sensor_list";
import type { Screen } from "../../App";
import type { Dispatch, SetStateAction } from "react";

export default function HomeScreen(props: {
	setScreens: Dispatch<SetStateAction<Screen[]>>;
}) {
	return <>
		<ProtectionStatus setScreens={props.setScreens}/>
		<SensorList/>
	</>
}
