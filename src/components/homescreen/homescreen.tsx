import "./homescreen.css"
import TopBar from "../topbar/topbar";
import ProtectionStatus from "./protection_status/status";
import SensorList from "./sensors/sensor_list";

export default function HomeScreen() {
	return <>
		<TopBar/>
		<ProtectionStatus/>
		<SensorList/>
	</>
}
