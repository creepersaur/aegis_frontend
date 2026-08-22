import type { Dispatch, SetStateAction } from "react";
import "./status.css";
import type { Screen } from "../../../App";

export default function ProtectionStatus(props: {
	setScreens: Dispatch<SetStateAction<Screen[]>>;
}) {
	return (
		<div
			className="protection-status"
			onClick={() => props.setScreens((prev) => [...prev, "liveStatus"])}
		>
			<img
				className="protection-icon"
				src="src/assets/protection_shield.png"
				alt="aegis icon gif"
			/>

			<div className="protection-header">
				Protection
				<span className="status">Active</span>

				<p>Click to view status</p>
			</div>
		</div>
	);
}
