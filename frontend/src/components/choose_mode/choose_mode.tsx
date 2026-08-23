import { ActivityIcon, AudioLines, CarFront, Grid, Mic, Move, Rotate3D, User } from "lucide-react";
import "./choose_mode.css";
import React from "react";

type MonitoringMode = "personal" | "vehicle";

export default function ChooseMode() {
	const [modeOpen, setModeOpen] = React.useState<MonitoringMode | null>();

	return (
		<>
			<span className="mode-title">
				<strong>Choose Mode</strong>
				<p>Select monitoring mode</p>
			</span>

			<div
				className="mode-button personal"
				onClick={() => setModeOpen("personal")}
			>
				<div className="header">
					<User />
					<div className="description">
						<strong>Personal Mode</strong>
						For cars, bikes, and other vehicles
					</div>
				</div>
				<div
					className={`layers ${
						modeOpen == "personal" ? "visible" : ""
					}`}
				>
					<div className="layer 1">
						<strong><Move/>Layer 1</strong>
						Phone Motion
						<p>Gyroscope + Accelerometer</p>
					</div>
					<div className="layer 2">
						<strong><Mic/>Layer 2</strong>
						Environment
						<p>Microphone + GPS</p>
					</div>
					<div className="layer 3">
						<strong><ActivityIcon/>Layer 3</strong>
						Vital Analysis
						<p>Wearable + Heartrate + Oxygen</p>
					</div>
				</div>
			</div>

			<div
				className="mode-button vehicle"
				onClick={() => setModeOpen("vehicle")}
			>
				<div className="header">
					<CarFront />
					<div className="description">
						<strong>Vehicle Mode</strong>
						For pedestrians and personal safety
					</div>
				</div>
				<div
					className={`layers ${
						modeOpen == "vehicle" ? "visible" : ""
					}`}
				>
					<div className="layer 1">
						<strong><Rotate3D/>Layer 1</strong>
						Motion Anomaly
						<p>Gyro + Accelerometer</p>
					</div>
					<div className="layer 2">
						<strong><AudioLines/>Layer 2</strong>
						Audio & Visual Check
						<p>Microphone + Dashcam</p>
					</div>
					<div className="layer 3">
						<strong><Grid/>Layer 3</strong>
						Speed Anomaly
						<p>GPS Tracking</p>
					</div>
				</div>
			</div>
		</>
	);
}
