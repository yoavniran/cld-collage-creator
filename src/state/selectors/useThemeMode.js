import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	themeMode
} = atoms;

const useThemeMode = createSelectorHook(themeMode);

export default useThemeMode;

export const themeModeSelector = useThemeMode.selector;
