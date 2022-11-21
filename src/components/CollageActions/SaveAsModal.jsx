import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import ConfirmationModal from "../ConfirmationDialog";

const SaveAsModal = ({
	                     onClose,
                     }) => {
	const { register, handleSubmit, formState } = useForm();
	const formErrors = formState.errors;
	const submit = handleSubmit(onClose);

	const onModalClose = (confirm) => {
		if (confirm) {
			submit();
		} else {
			onClose();
		}
	};

	const { onChange, ref: pidRef, name } = register("pid", {
		required: true,
		minLength: 4,
		maxLength: 120,
	});

	return (
		<ConfirmationModal
			title="Save Collage As"
			onClose={onModalClose}
			confirmLabel="Save"
		>
			<TextField
				fullWidth
				required
				label="Public ID"
				margin="normal"
				helperText="Public id of the generated collage image (min: 4, max: 120)"
				inputRef={pidRef}
				onChange={onChange}
				name={name}
				error={!!formErrors.pid}
			/>
		</ConfirmationModal>
	);
};

export default SaveAsModal;
