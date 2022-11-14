import { createSelectorHook } from "../../recoilUtils";
import { THEME_MODES } from "../../styles/theme";
import useThemeMode from "./useThemeMode";

const useIsDarkMode = createSelectorHook(
	"IsDarkModeSelector",
	(get) => get(useThemeMode.selector) === THEME_MODES.DARK,
);

export default useIsDarkMode;
