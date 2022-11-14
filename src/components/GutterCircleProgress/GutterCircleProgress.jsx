import CircularProgress, {
	// circularProgressClasses,
} from "@mui/material/CircularProgress";

const GutterCircleProgress = ({ gutterColor, color, ...props }) => {
	return (
		<>
			<CircularProgress
				{...props}
				variant="determinate"
				sx={{
					position: "absolute",
					color: gutterColor,
				}}
				value={100}
			/>
			<CircularProgress
				variant="indeterminate"
				disableShrink
				// sx={{
				// 	color: (theme) => (theme.palette.mode === "light" ? "#1a90ff" : "#308fe8"),
				// 	animationDuration: "550ms",
				// 	position: "absolute",
				// 	left: 0,
				// 	[`& .${circularProgressClasses.circle}`]: {
				// 		// strokeLinecap: "round",
				// 	},
				// }}
				// size={40}
				// thickness={4}
				{...props}
				color={color}
			/>
		</>
	);
};

export default GutterCircleProgress;
