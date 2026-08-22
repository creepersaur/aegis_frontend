import { ChevronLeftCircle } from "lucide-react";
import "./topbar.css";
import type { Screen } from "../../App";
import type { Dispatch, SetStateAction } from "react";

export default function TopBar(props: {
	screens: Screen[];
	setScreens: Dispatch<SetStateAction<Screen[]>>;
}) {
	return (
		<div className="topbar">
			{props.screens.length > 1 &&
				(
					<button className="back-button" onClick={() => {
						props.setScreens(prev => prev.slice(0, -1))
					}}>
						<ChevronLeftCircle />
					</button>
				)}
			<img
				className="aegis-logo"
				src="/aegis_logo.png"
				alt="aegis logo"
			/>
		</div>
	);
}
