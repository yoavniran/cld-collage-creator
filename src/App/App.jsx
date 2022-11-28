import { RecoilRoot } from "recoil";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "../styles/GlobalStyles";
import { LS_KEY } from "../consts";
import { useRecoilLocalStorageInitializer } from "../recoilUtils/recoil-spring";
import { spring } from "../state/store";
import collageStateInitializer from "../state/collageStateInitializer";
import AppThemeProvider from "../styles/AppThemeProvider";
import CollageCreator from "../components/CollageCreator";
import StateLogger from "../components/StateLogger";
import StatePersister from "../components/StatePersister";
import HtmlHead from "../components/HtmlHead";

const App = () => {
	const initializeRecoil = useRecoilLocalStorageInitializer({
		lsKey: LS_KEY,
		spring,
		customInitializer: collageStateInitializer,
	});

	return (
		<RecoilRoot initializeState={initializeRecoil}>
			<StateLogger/>
			<StatePersister/>
			<HtmlHead>
				<AppThemeProvider>
					<CssBaseline/>
					<GlobalStyles/>
					<CollageCreator/>
				</AppThemeProvider>
			</HtmlHead>
		</RecoilRoot>
	);
};

export default App;
