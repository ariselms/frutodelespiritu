import { upload } from "@vercel/blob/client";
import { useInput, ImageField, Labeled, Validator } from "react-admin";
import { useState, useRef } from "react";

export const VercelBlobInput = (props: {
	source: string;
	label?: string;
	validate?: Validator | Validator[];
}) => {
	const { field, isRequired, fieldState } = useInput(props);
	const [uploading, setUploading] = useState(false);
	const inputFileRef = useRef<HTMLInputElement>(null);

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];

		if (!file) return;

		setUploading(true);

		try {
			const newBlob = await upload(file.name, file, {
				access: "public",
				handleUploadUrl: "/api/admin/upload" // The new API route you just created
			});

			// Update the form value with the final URL
			field.onChange(newBlob.url);
		} catch (error) {
			console.error("Error uploading file:", error);
			// You might want to show an error notification to the user here
		} finally {
			setUploading(false);
		}
	};

	return (
		<Labeled label={props.label || props.source} isRequired={isRequired}>
			<div className="block w-full">
				{/* Hidden file input */}
				<input
					type="file"
					accept="image/*"
					ref={inputFileRef}
					onChange={handleFileChange}
					style={{ display: "none" }}
				/>
				{/* Button to trigger file selection */}
				<button
					type="button"
					onClick={() => inputFileRef.current?.click()}
					className="flex flex-col w-full bg-[#FFFFFF17] px-3 pt-4 pb-2 text-start border-b border-gray-300 cursor-pointer mb-4 rounded-tl-sm rounded-tr-sm text-gray-300"
					disabled={uploading}>
					{!fieldState.error && (
						<span className="text-gray-300 text-xs">Image URL</span>
					)}

					{uploading ? (
						<span>Uploading...</span>
					) : (
						<span
							className={`
              ${fieldState.error ? "text-red-600" : "text-gray-300"}
            `}>
							Choose Image<span aria-hidden="true"> *</span>
						</span>
					)}
				</button>

				{/* 2. Conditionally render the error message */}
				{fieldState.error && (
					<p className="text-red-600 text-xs -mt-2 ml-4 mb-2">Required</p>
				)}

				{/* Display the uploaded image preview */}
				{field.value && (
					<>
						{/* We create a fake record object for ImageField to use */}
						<ImageField
							record={{ url: field.value }}
							source="url"
							title="url"
						/>
					</>
				)}
			</div>
		</Labeled>
	);
};
