import { SpringRoot, getLocalStorageInitializer } from "recoil-spring";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "../styles/GlobalStyles";
import { LS_KEY } from "../consts";
import { spring } from "../state/store";
import collageStateInitializer from "../state/collageStateInitializer";
import AppThemeProvider from "../styles/AppThemeProvider";
import CollageCreator from "../components/CollageCreator";
import StateLogger from "../components/StateLogger";
import StatePersister from "../components/StatePersister";
import HtmlHead from "../components/HtmlHead";

const App = () => {
	const initializeRecoil = getLocalStorageInitializer({
		key: LS_KEY,
		customInitializer: collageStateInitializer,
	});

	return (
		<SpringRoot
			spring={spring}
			initializer={initializeRecoil}
		>
			<StateLogger/>
			<StatePersister/>
			<HtmlHead>
				<AppThemeProvider>
					<CssBaseline/>
					<GlobalStyles/>
					<CollageCreator/>
				</AppThemeProvider>
			</HtmlHead>
		</SpringRoot>
	);
};

export default App;
