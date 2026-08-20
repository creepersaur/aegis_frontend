import "./homescreen.css"
import type { Screen } from "../../App";
import TopBar from "../topbar/topbar";
import ProtectionStatus from "./protection_status/status";
import SensorList from "./sensors/sensor_list";
import BottomBar from "../bottombar/bottombar";

export default function HomeScreen(props: {navigate: React.Dispatch<React.SetStateAction<Screen>>}) {
	return <>
		<TopBar/>
		<ProtectionStatus/>
		<SensorList/>
		<BottomBar/>
	</>
}
