"use client";
import { useState } from "react";
import {
	Editor,
	EditorProvider,
	Toolbar,
	BtnBold,
	BtnItalic,
	BtnBulletList,
	BtnNumberedList,
	BtnUnderline,
	BtnLink,
	BtnStrikeThrough,
	BtnStyles,
	BtnUndo,
	BtnRedo,
	BtnClearFormatting,
	HtmlButton
} from "react-simple-wysiwyg";

export default function TextEditor({
	value,
	onChange,
  disabled
}: {
	value: string;
	onChange: (value: string) => any;
  disabled: boolean
}) {
	const handleEditorChange = (event: any) => {
		// support different event shapes the editor might emit:
		// - event.html
		// - event.target.value
		// - event.target.innerHTML
		// - or the event itself might be a string

		const html =
			event?.html ??
			event?.target?.value ??
			event?.target?.innerHTML ??
			(typeof event === "string" ? event : String(event));

		onChange(html);
	};

	return (
		<EditorProvider>
			<Editor
        disabled={disabled}
				className="p-2 text-sm font-medium text-black dark:text-white rounded-lg cursor-pointer border border-blue-700 focus:ring-4 focus:ring-blue-300 dark:border-gray-600 dark:focus:ring-gray-800 transition-all duration-300 ease-in w-full"
				style={{ width: "100%", minHeight: "150px" }}
				value={value}
				onChange={handleEditorChange}>
				<Toolbar>
					<BtnBold />
					<BtnItalic />
					<BtnUnderline />
					<BtnStrikeThrough />
					<BtnLink />
					<BtnBulletList />
					<BtnNumberedList />
					<BtnUndo />
					<BtnRedo />
				</Toolbar>
			</Editor>
		</EditorProvider>
	);
}
