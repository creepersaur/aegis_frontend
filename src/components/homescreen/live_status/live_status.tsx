import type { Dispatch, SetStateAction } from "react";
import "./live_status.css"
import TopBar from "../../topbar/topbar";
import type { Screen } from "../../../App";
import { Circle } from "lucide-react";

export default function LiveStatus(props: {
	screens: Screen[];
	setScreens: Dispatch<SetStateAction<Screen[]>>;
}) {
	return <>
		<TopBar screens={props.screens} setScreens={props.setScreens} />

		<div className="live-status">
			<strong>Live Status</strong>
			<p className="systems-normal"><Circle/> All systems normal</p>
			<img
				className="livestatus-icon"
				src="src/assets/live_status.png"
				alt="live-status icon"
			/>
		</div>
	</>
}
