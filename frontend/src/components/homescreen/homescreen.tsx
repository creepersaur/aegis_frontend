import "./homescreen.css"
import type { Screen } from "../../App";
import TopBar from "../topbar/topbar";
import ProtectionStatus from "./protection_status/status";
import SensorList from "./sensors/sensor_list";
import BottomBar from "../bottombar/bottombar";
import { useSensorWebSocket } from "../../hooks/useSensorWebSocket";

export default function HomeScreen(_props: {navigate: React.Dispatch<React.SetStateAction<Screen>>}) {
	const { isConnected, isTracking, startTracking, stopTracking } = useSensorWebSocket();

	return <>
		<TopBar/>
		<ProtectionStatus/>
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
			<div style={{ color: isConnected ? '#4CAF50' : '#f44336', marginBottom: '10px', fontSize: '14px' }}>
				{isConnected ? '🟢 ML Engine Connected' : '🔴 ML Engine Disconnected'}
			</div>
			
			{!isTracking ? (
				<button 
					onClick={startTracking}
					style={{
						background: 'linear-gradient(var(--accent) -10%, var(--accent-inner) 75%)',
						color: 'white', border: 'none', padding: '15px 30px', 
						borderRadius: '25px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer',
						boxShadow: '0 4px 15px rgba(255, 141, 34, 0.4)'
					}}
				>
					🛡️ Start Tracking Safety
				</button>
			) : (
				<button 
					onClick={stopTracking}
					style={{
						background: '#333',
						color: 'white', border: '1px solid #555', padding: '15px 30px', 
						borderRadius: '25px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer'
					}}
				>
					🛑 Stop Tracking
				</button>
			)}
		</div>
		<SensorList/>
		<BottomBar/>
	</>
}
