import { Activity, Camera, ChevronRight, MapPin, Mic, Settings } from "lucide-react"
import "./sensor_list.css"

export default function SensorList() {
	let sensors = [
		{
			Name: "Accelerometer",
			Active: true,
			Icon: Activity,
		},
		{
			Name: "Gyroscope",
			Active: true,
			Icon: Settings,
		},
		{
			Name: "Microphone",
			Active: true,
			Icon: Mic,
		},
		{
			Name: "Camera",
			Active: true,
			Icon: Camera,
		},
		{
			Name: "Location (GPS)",
			Active: true,
			Icon: MapPin,
		}
	]

	return <>
		<span className="sensor-title">Sensors & Permissions</span>

		<div className="sensor-list">
			{
				sensors.map(item => {
					return <div className="sensor-item">
						<item.Icon/>
						{item.Name}
						<div className="sensor-status">
							Active <ChevronRight/>
						</div>
					</div>
				})
			}
		</div>
	</>
}
