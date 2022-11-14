import { knuthShuffle } from "knuth-shuffle";

const randomizeArray = (arr) => {
	return knuthShuffle(arr);
};

export default randomizeArray;
