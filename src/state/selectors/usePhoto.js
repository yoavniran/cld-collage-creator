import atoms, { createSelectorFamilyHook } from "../store";

const {
	photos,
} = atoms;

const usePhoto = createSelectorFamilyHook({
	key: "PhotoFamilySelector",
	getter: photos,
	setter: (param, uploadyItem, { set, reset }) => {
		if (uploadyItem === null) {
			reset(photos(param));
		} else {
			const cldId = uploadyItem.uploadResponse.data.public_id;

			//use the cld public id as the family member key !!!!
			set(photos(cldId), {
				name: uploadyItem.file.name,
				url: uploadyItem.uploadResponse.data.secure_url,
				cldId,
			});
		}
	},
});

export default usePhoto;
