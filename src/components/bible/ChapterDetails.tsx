"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { serverBaseUrl } from "@/static";
import { usePathname } from "next/navigation";
import AddNoteOrMemoryItem from "@/components/drawers/AddNoteOrMemoryItemSlide";
import { BibleBookType } from "@/models/bibleTypes";
import UserSavedVerses from "@/components/bible/UserSavedVerses";
import BibleContentBuilder from "@/components/bible/BibleContentBuilder";
import { createRoot } from "react-dom/client";
import { parseSid } from "@/helpers";
import ModalToPromptUserToLogin from "../modals/ModalPromptUserToLogin";

export function ChapterDetails({
	ChapterContent,
	Book,
	ChapterInfo,
	BibleName
}: {
	ChapterContent: any[];
	Book: BibleBookType;
	ChapterInfo: any;
	BibleName: string;
}) {
	// STATES //
	const { user } = useAuthContext();
	const pathname = usePathname();
	const contentRef = useRef<HTMLDivElement>(null);
	const [selectedVerses, setSelectedVerses] = useState<Set<string>>(new Set());
	const { bibleId, bookId, chapterId } = useParams();
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	const [isModalToPromptUserToLoginOpen, setIsModalToPromptUserToLoginOpen] =
		useState<boolean>(false);
	const [userSavedVerses, setUserSavedVerses] = useState<any>(null);

	// EFFECTS //
	// EFFECT 1: Effect for scrolling to a hash link if present in the URL
	useEffect(() => {
		const timer = setTimeout(() => {
			const hash = window.location.hash;

			if (hash && contentRef.current) {
				const targetId = hash.substring(1);

				const targetElement = contentRef.current.querySelector(
					`[id="${targetId}"]`
				);

				if (targetElement) {
					targetElement.scrollIntoView({ behavior: "smooth" });
				}
			}
		}, 100);

		return () => clearTimeout(timer);
	}, [ChapterContent]);

	// EFFECT 2: Set up the delegated event listener with corrected selection logic
	useEffect(() => {
		const content = contentRef.current;

		if (!content || !ChapterContent || ChapterContent.length === 0) return;

		const firstVerse = ChapterContent.find(
			(item: any) => item.type === "verse"
		);

		if (!firstVerse) return;

		const currentBook = bookId;

		const currentChapter = chapterId;

		const handleContainerClick = (event: MouseEvent) => {
			// Update the following to use a modal instead of redirecting the user right away
			if (!user) {
				setIsModalToPromptUserToLoginOpen(true);

				return;
			}

			const verseSpan = (event.target as Element).closest("span.v");

			if (!verseSpan) return;

			const verseNumber = (verseSpan as HTMLElement).dataset.number;

			if (!verseNumber) return;

			const verseSid = `${currentBook} ${currentChapter}:${verseNumber}`;

			setSelectedVerses((prevSelected) => {
				const newSelection = new Set(prevSelected);

				// --- SCENARIO 1: The verse is already selected (TRUNCATE LOGIC) ---
				if (newSelection.has(verseSid)) {
					const parsedSids = Array.from(newSelection)
						.map(parseSid)
						.filter((p): p is NonNullable<typeof p> => p !== null);

					parsedSids.sort((a, b) => a.verse - b.verse);

					const clickedVerseInfo = parseSid(verseSid);

					if (!clickedVerseInfo) return prevSelected;

					const truncateIndex = parsedSids.findIndex(
						(p) => p.verse === clickedVerseInfo.verse
					);

					// Keep verses from the beginning *up to (but not including)* the clicked verse.
					const finalSids = parsedSids.slice(0, truncateIndex); // Removed the "+ 1"

					const finalSelectionSet = new Set<string>();

					finalSids.forEach((p) => {
						finalSelectionSet.add(`${p.book} ${p.chapter}:${p.verse}`);
					});

					setIsDrawerOpen(true);

					return finalSelectionSet;
				}

				// --- SCENARIO 2: The verse is new (GAP-FILLING LOGIC) ---
				else {
					newSelection.add(verseSid);

					const parsedSids = Array.from(newSelection)
						.map(parseSid)
						.filter((p): p is NonNullable<typeof p> => p !== null);

					if (parsedSids.length > 1) {
						const first = parsedSids[0];
						const isSameChapter = parsedSids.every(
							(p) => p.book === first.book && p.chapter === first.chapter
						);

						if (isSameChapter) {
							const verseNumbers = parsedSids.map((p) => p.verse);
							const minVerse = Math.min(...verseNumbers);
							const maxVerse = Math.max(...verseNumbers);

							for (let i = minVerse; i <= maxVerse; i++) {
								const gapSid = `${first.book} ${first.chapter}:${i}`;
								newSelection.add(gapSid);
							}
						}
					}

					setIsDrawerOpen(true);

					return newSelection;
				}
			});
		};

		content.addEventListener("click", handleContainerClick);

		return () => {
			content.removeEventListener("click", handleContainerClick);
		};
	}, [ChapterContent, user]);

	// EFFECT 3: Apply visual styles upon selection changes
	useEffect(() => {
		const content = contentRef.current;

		if (!content) return;

		// Cleanup phase
		content.querySelectorAll("mark.verse-highlight").forEach((markElement) => {
			const parent = markElement.parentNode;

			if (parent) {
				while (markElement.firstChild) {
					parent.insertBefore(markElement.firstChild, markElement);
				}
				parent.removeChild(markElement);
			}
		});

		// Application phase
		if (selectedVerses.size > 0) {
			selectedVerses.forEach((sid) => {
				const parsed = parseSid(sid);

				if (!parsed) return;

				const verseNumberSpan = content.querySelector(
					`span[data-number="${parsed.verse}"]`
				);

				if (!verseNumberSpan) return;

				const parentP = verseNumberSpan.parentElement;

				if (!parentP) return;

				const nodesToWrap = [];

				let currentNode = verseNumberSpan.nextSibling;

				while (currentNode) {
					nodesToWrap.push(currentNode);
					currentNode = currentNode.nextSibling;
				}

				if (nodesToWrap.length > 0) {
					const wrapper = document.createElement("mark");

					wrapper.className =
						"verse-highlight bg-orange-100 dark:bg-gray-900 dark:text-gray-100 rounded px-1";

					parentP.insertBefore(wrapper, nodesToWrap[0]);

					nodesToWrap.forEach((node) => wrapper.appendChild(node));
				}
			});
		}
	}, [selectedVerses, ChapterContent]);

	// Effect 4: On load, fetch the user saved verses if they exists
	useEffect(() => {
		if (!user) return;

		fetchUserSavedVerses();
	}, [user]);

	// Effect 5: Set the icons after the bible verse to indicate that the user has saved something that includes the bible verse
	useEffect(() => {
		const content = contentRef.current;
		if (!content || !userSavedVerses) return;

		// Keep track of roots to unmount them cleanly later if needed
		const roots: any[] = [];

		userSavedVerses.forEach((learningItem: any) => {

			const learningListsData: { listId: number | null; listName: string } = {listId: null, listName: ""};

      learningListsData.listName = learningItem.learning_list_name
      learningListsData.listId = learningItem.learning_list_id;

			const verseSpan = content.querySelector(
				`span[data-number="${learningItem.verse_from}"]`
			);

			const parentP = verseSpan?.parentElement;

			if (!parentP) return;

			parentP.classList.add("inline-flex");
			parentP.classList.add("items-start");
			parentP.classList.add("flex-wrap");

			// 1. Create a container DOM element for the React component
			const iconContainer = document.createElement("span");

			// Optional: Add styles or classes to position it nicely
			iconContainer.style.display = "inline-flex";
			iconContainer.setAttribute("data-icon-type", "saved-verse"); // Mark it to avoid duplicates

			// 2. Insert the container into the real DOM
			verseSpan.insertAdjacentElement("afterend", iconContainer);

			// 3. Use createRoot to render the interactive React component into the container
			const root = createRoot(iconContainer);

			root.render(
				<UserSavedVerses
					verses={learningItem}
					listsData={learningListsData}
				/>
			);

			roots.push(root);
		});
	}, [userSavedVerses, ChapterContent]);

	// HANDLRES //
	// HANDLER 1 fetch user saved verses
	const fetchUserSavedVerses = async () => {
		if (!user) return;

		try {
      document.querySelectorAll('span[data-icon-type="saved-verse"]').forEach((el) => el.remove());
			// request the learning_item where the by_user_id is the current user and the bible_id, book_id and chapter_id are matches
			const requestUserSavedVerses = await fetch(
				`${serverBaseUrl}/api/user/${user?.id}/memorization/item/details/${bibleId}/${bookId}/${chapterId}`
			);

			if (!requestUserSavedVerses.ok) {
				throw new Error("Failed to fetch user saved verses");
			}

			const responseUserSavedVerses = await requestUserSavedVerses.json();

			if (responseUserSavedVerses?.data?.length === 0) {
				return;
			}

			setUserSavedVerses(responseUserSavedVerses?.data);

		} catch (error) {
			console.error("Error fetching user saved verses:", error);
		}
	};

	return (
		<>
			<div className="bible-chapter max-w-[80ch] mx-auto my-4" ref={contentRef}>
				{ChapterContent.map((chapterData: any, index: number) => {
					return <BibleContentBuilder chapterData={chapterData} key={index} />;
				})}
			</div>

			{/* Prompt from the top to ask the user to use the selected versicles for notes or memorization */}
			{selectedVerses.size > 0 && (
				<>
					<AddNoteOrMemoryItem
						bibleBook={Book}
						selectedVerses={selectedVerses}
						setSelectedVerses={setSelectedVerses}
						bibleId={String(bibleId)}
						chapterContent={ChapterContent}
						isDrawerOpen={isDrawerOpen}
						chapterInfo={ChapterInfo}
						bibleName={BibleName}
						fetchUserSavedVerses={fetchUserSavedVerses}
					/>
				</>
			)}

			{/* Modal to inform the user to log in to use the feature */}
			<ModalToPromptUserToLogin
				isModalToPromptUserToLoginOpen={isModalToPromptUserToLoginOpen}
				setIsModalToPromptUserToLoginOpen={setIsModalToPromptUserToLoginOpen}
				pathname={pathname}
			/>
		</>
	);
}
