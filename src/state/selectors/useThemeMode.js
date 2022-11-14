import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	themeMode
} = atoms;

const useThemeMode = createSelectorHook(
	"ThemeModeSelector",
	themeMode,
);

export default useThemeMode;
