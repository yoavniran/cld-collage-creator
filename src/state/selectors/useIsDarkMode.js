import { createSelectorHook } from "recoil-spring";
import { THEME_MODES } from "../../styles/theme";
import { themeModeSelector } from "./useThemeMode";

const useIsDarkMode = createSelectorHook(
	"IsDarkModeSelector",
	(get) => get(themeModeSelector) === THEME_MODES.DARK,
);

export default useIsDarkMode;
