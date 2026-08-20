import type React from "react";

export default function GetStartedButton(props: {
	onClick: React.MouseEventHandler,
}) {
	return <button className="get-started" onClick={props.onClick}>
		GET STARTED
	</button>
}
