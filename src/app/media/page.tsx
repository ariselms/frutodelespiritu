"use client";

import React, { useEffect, useState } from "react";
import JumbotronSection from "@/components/JumbotronSection";
import BibleEverywhere from "@/components/bible/BibleEverywhere";
import {
	OrangeGradientRightToBottomLeft,
	BlueGradientRightToBottomLeft,
	RedGradientRightToBottomLeft,
	PurpleGradientRightToBottomLeft
} from "@/components/media";
import { PassageSelection } from "@/models/bibleTypes";
import { useRouter } from "next/navigation";
import ModalGeneratedImageToShare from "@/components/modals/ModalGeneratedImageToShare";

export default function MediaPage() {
	// -- STATE -- //
	const router = useRouter();

	const [showControllers, setShowControllers] = useState<Boolean>(false);

	const [passageSelection, setPassageSelection] = useState<PassageSelection>({
		translation: null,
		book: null,
		chapter: null,
		verses: null,
		content: null,
		passageText: null
	});

	const [selectedBackgroundImageValue, setSelectedBackgroundImageValue] =
		useState<string>(
			"to left bottom, rgb(254, 215, 170), rgb(255, 237, 213), rgb(255, 247, 237)"
		);

	const [mediaControllers, setMediaControllers] = useState({
		verseInfoSize: 36,
		passageTextSize: 24,
		currentBackgroundLayout: 0,
		selectedBackgroundImageValue: selectedBackgroundImageValue
	});

	const mediaBackgrounds = [
		OrangeGradientRightToBottomLeft,
		BlueGradientRightToBottomLeft,
		RedGradientRightToBottomLeft,
		PurpleGradientRightToBottomLeft
	];

	const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");

	const [showGeneratedImage, setShowGeneratedImage] = useState<boolean>(false);

	const usage = null;

	// -- USE EFFECT -- //
	useEffect(() => {
		if (
			passageSelection.translation === null ||
			passageSelection.book === null ||
			passageSelection.chapter === null ||
			passageSelection.verses === null ||
			passageSelection.content === null ||
			passageSelection.passageText === null
		) {
			return;
		}

		setShowControllers(true);
	}, [passageSelection]);

	// -- HANDLERS -- //
	const handleIncreaseText = (type: string) => {
		switch (type) {
			case "verseInfoSize":
				if (mediaControllers.verseInfoSize >= 48) {
					return;
				}

				setMediaControllers({
					...mediaControllers,
					verseInfoSize: mediaControllers.verseInfoSize + 1
				});

				break;

			case "passageTextSize":
				if (mediaControllers.passageTextSize >= 32) {
					return;
				}

				setMediaControllers({
					...mediaControllers,
					passageTextSize: mediaControllers.passageTextSize + 1
				});

				break;

			default:
				break;
		}
	};
	const handleDecreaseText = (type: string) => {
		switch (type) {
			case "verseInfoSize":
				if (mediaControllers.verseInfoSize <= 24) {
					return;
				}

				setMediaControllers({
					...mediaControllers,
					verseInfoSize: mediaControllers.verseInfoSize - 1
				});

				break;

			case "passageTextSize":
				if (mediaControllers.passageTextSize <= 16) {
					return;
				}

				setMediaControllers({
					...mediaControllers,
					passageTextSize: mediaControllers.passageTextSize - 1
				});

				break;

			default:
				break;
		}
	};
	// click event to get the element style attribute
	const handleGetElementBackgroundHex = (event: any) => {
		const backgroundImage = event.target.style.backgroundImage;

		const backgroundImageValue = backgroundImage.substring(
			backgroundImage.indexOf("(") + 1,
			backgroundImage.lastIndexOf(")")
		);

		setSelectedBackgroundImageValue(backgroundImageValue);
	};

	// -- FETCHING HANDLERS -- //
	const generateImage = async () => {
		if (
			passageSelection.translation === null ||
			passageSelection.translation === undefined ||
			passageSelection.book === null ||
			passageSelection.book === undefined ||
			passageSelection.chapter === null ||
			passageSelection.chapter === undefined ||
			passageSelection.verses === null ||
			passageSelection.verses === undefined ||
			passageSelection.content === null ||
			passageSelection.content === undefined ||
			passageSelection.passageText === null ||
			passageSelection.passageText === undefined
		) {
			return;
		}

		const requestBibleImage = await fetch(
			`/api/bible/images?translation=${passageSelection.translation.name}&book=${passageSelection.book.name}&chapter=${passageSelection.chapter}&verseFrom=${passageSelection.verses[0]}&verseTo=${passageSelection.verses[1]}&passageText=${passageSelection.passageText}&selectedBackgroundImageValue=${selectedBackgroundImageValue}&verseInfoSize=${mediaControllers.verseInfoSize}&passageTextSize=${mediaControllers.passageTextSize}&usage=main`
		);

		if (requestBibleImage.ok) {
			const responseBibleImage = await requestBibleImage.blob();

			const imageUrl = URL.createObjectURL(responseBibleImage);

			setGeneratedImageUrl(imageUrl);

			setShowGeneratedImage(true);
		}
	};

	return (
		<main className="bg-white dark:bg-gray-800">
			<JumbotronSection
				section="Media"
				description="Elige versículos bíblicos y descárgalos para tus proyectos de video, audio y multimedia o comparte en las redes."
			/>
			<div className="max-w-7xl mx-auto py-8 px-2 xl:px-0 ">
				<div className="px-4 xl:px-0 w-full flex flex-col lg:flex-row gap-8 lg:gap-12">
					<aside className="flex-1 lg:flex-1">
						<BibleEverywhere setPassageSelection={setPassageSelection} />
					</aside>
					<section className="flex-1 lg:flex-2 px-4 xl:px-0">
						{showControllers && (
							<>
								<div className="flex flex-col items-center justify-between">
									<div className="text-slate-950 dark:text-gray-50">
										Ajusta el tamaño de los textos
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center justify-between text-slate-950 dark:text-gray-50 bg-slate-50 dark:bg-gray-800 rounded-lg px-4 py-0 mb-2 w-fit border border-slate-200 dark:border-gray-600">
											<span
												onClick={() => handleIncreaseText("verseInfoSize")}
												className="w-8 h-8 flex items-center justify-center leading-none text-2xl font-bold cursor-pointer rounded-full text-slate-700 dark:text-gray-50 transition-all">
												+
											</span>
											<span className="font-bold text-sm">Referencia</span>
											<span
												onClick={() => handleDecreaseText("verseInfoSize")}
												className="w-8 h-8 p-5 flex items-center justify-center leading-none text-2xl font-bold cursor-pointer rounded-full text-slate-700 dark:text-gray-50 transition-all">
												-
											</span>
										</div>
										<div className="flex items-center justify-between text-slate-950 dark:text-gray-50 bg-slate-50 dark:bg-gray-800 rounded-lg px-4 py-0 mb-2 w-fit border border-slate-200 dark:border-gray-600">
											<span
												onClick={() => handleIncreaseText("passageTextSize")}
												className="w-8 h-8 p-5 flex items-center justify-center leading-none text-2xl font-bold cursor-pointer rounded-full text-slate-700 dark:text-gray-50 transition-all">
												+
											</span>
											<span className="font-bold text-sm">Pasaje</span>
											<span
												onClick={() => handleDecreaseText("passageTextSize")}
												className="w-8 h-8 p-5 flex items-center justify-center leading-none text-2xl font-bold cursor-pointer rounded-full text-slate-700 dark:text-gray-50 transition-all">
												-
											</span>
										</div>
									</div>
								</div>
							</>
						)}
						<div className="aspect-video mx-auto bg-gray-300">
							<>
								{React.createElement(
									mediaBackgrounds[mediaControllers.currentBackgroundLayout],
									{ passageSelection, mediaControllers, usage: "main" }
								)}
							</>
						</div>
						{showControllers && (
							<div className="w-full flex items-center justify-center mt-2">
								<button
									onClick={generateImage}
									className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-2xl text-sm w-full sm:w-auto p-4 text-center dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 cursor-pointer dark:border-gray-600 border border-slate-100 transition-all ">
									Ver Prevista
								</button>
							</div>
						)}
						<div>
							<div className="text-lg font-bold uppercase text-slate-950 dark:text-gray-50 text-center py-4">
								Selecciona una plantilla
							</div>
							<div>
								<div className="flex items-center justify-start gap-4">
									{mediaBackgrounds.map((background, index) => {
										return (
											<div
												key={index}
												onClick={(event: any) => {
													setMediaControllers({
														...mediaControllers,
														currentBackgroundLayout: index
													});
													handleGetElementBackgroundHex(event);
												}}
												className={`${
													mediaControllers.currentBackgroundLayout === index &&
													"border-4 border-slate-200 dark:border-gray-600"
												} aspect-video w-full h-auto mx-auto bg-gray-300 cursor-pointer`}>
												{React.createElement(background, {
													passageSelection,
													mediaControllers,
													usage
												})}
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>

			{showGeneratedImage && (
				<ModalGeneratedImageToShare
					showGeneratedImage={showGeneratedImage}
					setShowGeneratedImage={setShowGeneratedImage}
					generatedImageUrl={generatedImageUrl}
				/>
			)}
		</main>
	);
}
