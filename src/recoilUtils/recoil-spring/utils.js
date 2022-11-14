import { isRecoilValue } from "recoil";

//TODO: need to error on selector (only accept atom or atomFamily)
const getAtomFamilyRootName = (recoilVal) => {
	const parts = getAtomFamilyParts(recoilVal);
	return parts.length > 1 ? parts[0] : null;
};

const getAtomFamilyParam = (recoilVal) => {
	const parts = getAtomFamilyParts(recoilVal);
	return parts.length > 1 ? parts[1] : null;
};

const getAtomFamilyParts = (recoilVal) => {
	const atom = isRecoilValue(recoilVal) ? recoilVal : recoilVal("TEST");
	return atom.key.split("__");
};

export {
	getAtomFamilyParam,
	getAtomFamilyRootName,
	getAtomFamilyParts,
}
