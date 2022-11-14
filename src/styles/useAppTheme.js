import THEMES from "./theme";
import { useThemeMode } from "../state/selectors";

const useAppTheme = () => {
	const [mode] = useThemeMode();

	return THEMES[mode];
};

export default useAppTheme;
