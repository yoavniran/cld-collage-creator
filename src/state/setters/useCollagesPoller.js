import {
	createReactiveSetterHook,
	createFamilyTrackerSelector,
} from "recoil-spring";
import { WEBHOOK_URL_BASE } from "../../consts";
import { logger, requestGet } from "../../utils";
import atoms from "../store";

const TEN_MINUTES = 1000 * 60 * 10,
	COLLAGES_URL = `${WEBHOOK_URL_BASE}findCollage`;

const {
	pollingReqs,
} = atoms;

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
			const now = Date.now();

			const filtered = reqs.reduce((res, req) => {
				if (req.attempts < 10 && (now - req.createTime) < TEN_MINUTES) {
					res.pending.push(req);
				} else {
					res.expired.push(req);
				}

				return res;
			}, { pending: [], expired: [] });

			console.log("!!!!!!!!! COLLAGES POLLER - requests = ", filtered);


			if (filtered.expired.length) {
				//reset expired requests
				filtered.expired.forEach((req) => reset(pollingReqs(req.requestId)));
				//TODO: should show something about failed requests in the UI?
			}

			if (filtered.pending.length) {
				const rids = filtered.pending.map((req) => req.requestId).join(",");

				const response = await requestGet(`${COLLAGES_URL}?rid=${rids}`);

				console.log("GOT COLLAGES RESPONSE FROM SERVER !!!", response);

			}
			// const updated = await getNewDataForItemsSpy(items, 200);
			// //new data will now get to the UI through the selector hook
			// updated.forEach((item) => set(spring.atoms.items(item.id), item));
		}
	},
	{
		delay: 1000,
		debounce: true,
	},
);

export default useCollagesPoller;
