import "./settings.css";
import { ChevronRight, Info, LogOut } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { Screen } from "../../App";
import { useAuth } from "../../context/AuthContext";

export default function Settings(props: {
	setScreens: Dispatch<SetStateAction<Screen[]>>;
}) {
	const { setIsAuthenticated } = useAuth();

	const handleLogout = async () => {
		try {
			await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/logout`, {
				method: 'POST',
				credentials: 'include'
			});
		} catch (e) {
			console.error("Logout request failed", e);
		} finally {
			setIsAuthenticated(false);
			props.setScreens(["start"]);
		}
	};

	return (
		<>
			<span className="settings-title">Settings</span>

			<div className="settings-items">
				<button onClick={() => props.setScreens(prev => [...prev, "profile"])}>
					Profile <ChevronRight />
				</button>
				<button onClick={() => props.setScreens(prev => [...prev, "devices"])}>
					Devices <ChevronRight />
				</button>

				<button>
					Privacy & Data <ChevronRight />
				</button>
				<button onClick={() => props.setScreens(prev => [...prev, "about"])}>
					About <ChevronRight />
				</button>
				<button onClick={handleLogout} style={{ color: "#ef4444" }}>
					Logout <LogOut size={18} style={{ marginLeft: "auto" }} />
				</button>
			</div>

			<div className="tnc">
				By using Aegis, you agree to the{" "}
				<strong 
					onClick={() => props.setScreens(prev => [...prev, "terms"])}
					style={{ cursor: "pointer" }}
				>
					Terms and Conditions <Info size={14} style={{ display: "inline", marginBottom: "-2px" }} />
				</strong>{" "}
				.
			</div>
		</>
	);
}
