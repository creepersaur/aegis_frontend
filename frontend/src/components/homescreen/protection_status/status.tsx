import "./status.css";

export default function ProtectionStatus() {
	return (
		<div className="protection-status">
			<img
				className="protection-icon"
				src="https://preview.redd.it/random-question-but-does-anyone-have-versions-of-this-cat-v0-ya8qikz9kn0f1.png?auto=webp&s=c2fdba9a3904ab3bec9e7367e380f66343c2929a"
				alt="aegis icon gif"
			/>

			<div className="protection-header">
				Protection
				<span className="status">Active</span>

				<p>Aegis is monitoring for any anomalies.</p>
			</div>
		</div>
	);
}
