import "./live_status.css";
import { ChevronDown, Circle } from "lucide-react";

export default function LiveStatus() {
	return (
		<>
			<div className="live-status">
				<strong>Live Status</strong>

				<p className="systems-normal">
					<Circle /> All systems normal
				</p>

				<div className="livestatus-icon">
					<div className="livestatus-glow-spin">
						<img
							className="livestatus-glow"
							src="src/assets/live_status_glow.png"
							alt="live-status icon"
						/>
					</div>
					<img
						className="livestatus-shield"
						src="src/assets/live_status_shield.png"
						alt="live-status icon"
					/>
				</div>

				<strong className="continuous-monitoring">Continuous Monitoring in Progress</strong>

				<button className="monitoring-down">
					<ChevronDown/>
				</button>
			</div>
		</>
	);
}
