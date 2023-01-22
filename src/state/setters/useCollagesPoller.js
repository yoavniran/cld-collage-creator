import {
	createReactiveSetterHook,
	createFamilyTrackerSelector,
} from "recoil-spring";
import { NOTIFICATION_TYPES, WEBHOOK_URL_BASE } from "../../consts";
import { logger, requestGet } from "../../utils";
import atoms from "../store";

const EXPIRY_TIME = 1000 * 60 * 10, //10 minutes
	EXPIRY_ATTEMPTS = 30,
	COLLAGES_URL = `${WEBHOOK_URL_BASE}collageFind`;

const {
	pollingReqs,
	collages,
	notifications,
} = atoms;

export const getIsRequestExpired = (req) =>
	req.attempts >= EXPIRY_ATTEMPTS || (Date.now() - req.createTime) > EXPIRY_TIME;

const pollingReqsPollerSelector = createFamilyTrackerSelector(
	"pollingReqsPollerTrackerSelector",
	pollingReqs,
	(ids, get) =>
		ids
			.map((id) => get(pollingReqs(id))),
);

const useCollagesPoller = createReactiveSetterHook(
	pollingReqsPollerSelector,
	async ({ set, reset }, reqs) => {
		if (reqs.length) {
			const filtered = reqs.reduce((res, req) => {
				if (getIsRequestExpired(req)) {
					res.expired.push(req);
				} else {
					res.pending.push(req);
				}

				return res;
			}, { pending: [], expired: [] });

			logger.log("Collages Status Poller - handling requests: ", filtered);

			if (filtered.expired.length) {
				const plural = filtered.expired.length > 1 ? "s" : "";

				set(notifications, (prev) => [{
					type: NOTIFICATION_TYPES.POLL_REQUEST_EXPIRED,
					severity: "error",
					message: `Polling request${plural} for collage${plural} expired`,
				}, ...prev]);

				//reset expired requests
				filtered.expired.forEach((req) =>
					reset(pollingReqs(req.requestId)));
			}

			if (filtered.pending.length) {
				const rids = filtered.pending.map((req) => req.requestId).join(",");
				const response = await requestGet(`${COLLAGES_URL}?rid=${rids}`);

				filtered.pending.forEach((req) => {
					const collage = response.serverResponse.data[req.requestId];

					if (collage) {
						logger.log("Collages Status Poller - ${req.requestId} - found collage data !", collage);
						//found - can be removed from polling and added to collages family
						reset(pollingReqs(req.requestId));
						set(collages(collage.public_id), { ...collage, createTime: req.createTime }, true);
					} else {
						logger.log(`Collages Status Poller - ${req.requestId} - no data found it. Incrementing attempts`, req);

						//not found - update attempt count and cause another polling
						set(pollingReqs(req.requestId), {
							...req,
							attempts: req.attempts + 1,
						});
					}
				});
			}
		}
	},
	{
		delay: 2000,
		debounce: true,
	},
);

export default useCollagesPoller;
