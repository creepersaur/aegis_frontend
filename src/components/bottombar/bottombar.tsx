import { AlertCircle, Contact, Home, Settings } from "lucide-react";
import "./bottombar.css";
import type { Screen } from "../../App";

export default function BottomBar(props: {
	screen: Screen,
	navigate: (new_screen: Screen) => void;
}) {
	const buttons: {Name: string, Icon: React.ElementType, Screen: Screen}[] = [
		{
			Name: "Home",
			Icon: Home,
			Screen: "home",
		},
		{
			Name: "Alerts",
			Icon: AlertCircle,
			Screen: "alerts",
		},
		{
			Name: "Contacts",
			Icon: Contact,
			Screen: "contacts",
		},
		{
			Name: "Settings",
			Icon: Settings,
			Screen: "settings",
		},
	];

	return (
		<div className="bottombar">
			{buttons.map((item) => {
				return (
					<button className={props.screen === item.Screen ? "active" : ""}
							onClick={() => props.navigate(item.Screen)}
					>
						<item.Icon />
						{item.Name}
					</button>
				);
			})}
		</div>
	);
}
