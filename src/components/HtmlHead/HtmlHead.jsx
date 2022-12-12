import { Helmet, HelmetProvider } from "react-helmet-async";
import favicon from "../../../assets/ccc-logo-light-192.png";

const HtmlHead = ({ children }) => {
	return (
		<HelmetProvider>
			<Helmet>
				<link rel="icon" type="image/png" href={favicon} sizes="192x192"/>
			</Helmet>
			{children}
		</HelmetProvider>
	);
};

export default HtmlHead;
