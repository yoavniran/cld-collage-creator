import { Helmet, HelmetProvider } from "react-helmet-async";
import favicon from "../../../assets/ccc-logo-light-192.png";

const HtmlHead = ({ children }) => {
	return (
		<HelmetProvider>
			<Helmet>
				<link rel="icon" type="image/png" href={favicon} sizes="192x192"/>
				<meta property="og:title" content="Cloudinary Collage Creator by Yoav Niran" />
				<meta property="og:type" content="website" />

				<meta property="og:image" content="/ccc-og.png" />
				<meta
					name="description"
					content="Create a collage from your photos using Cloudinary"
				/>
				<meta name="keywords" content="images,photos,collage,tool,cloudinary,create" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:title" content="Cloudinary Collage Creator by Yoav Niran" />
			</Helmet>
			{children}
		</HelmetProvider>
	);
};

export default HtmlHead;
