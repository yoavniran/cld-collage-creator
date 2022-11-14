import styled from "styled-components";
import { useThemeMode } from "../../state/selectors";
import { THEME_MODES } from "../../styles/theme";
import darkModeLogo from "../../../assets/ccc-logo-dark.png";
import lightModeLogo from "../../../assets/ccc-logo-light.png";

const LogoImage = styled.img`
	height: 54px;
	width: auto;
`;

const Logo = ({ className }) => {
	const [mode] = useThemeMode();

	return (
		<LogoImage
			className={className}
			src={mode === THEME_MODES.DARK ? darkModeLogo : lightModeLogo}
		/>
	);
};

export default Logo;
