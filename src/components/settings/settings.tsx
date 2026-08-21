import "./settings.css"
import TopBar from "../topbar/topbar";
import { ChevronRight, Info } from "lucide-react";

export default function Settings() {
	return <>
		<TopBar/>

		<span className="settings-title">Settings</span>

		<div className="settings-items">
			<button>Profile <ChevronRight/></button>
			<button>Devices <ChevronRight/></button>
			<button>History <ChevronRight/></button>
			<button>Privacy & Data <ChevronRight/></button>
			<button>About <ChevronRight/></button>
		</div>

		<div className="tnc">
			By using Aegis, you agree to the <strong>Terms and Conditions <Info/></strong> .
		</div>
	</>
}
