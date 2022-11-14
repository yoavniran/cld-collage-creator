import { composeEnhancers } from "@rpldy/uploady";
import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import { retryEnhancer } from "@rpldy/retry-hooks";

const mockEnhancer = getMockSenderEnhancer({
	delay: 2000,
	responseStatus: 400,
	response: "ERROR!",
	isSuccessfulCall: () => false,
	//response: {
	// 	public_id: "dummy-123",
	// 	secure_url: "https://res.cloudinary.com/yoav-cloud/image/upload//h_160,dpr_2,g_auto,c_fill/v1664968910/dzt7ci4pol6uhqrn9jvg.jpg",
	// },
});

const uploadyEnhancers = composeEnhancers(retryEnhancer, mockEnhancer);

export default uploadyEnhancers;
