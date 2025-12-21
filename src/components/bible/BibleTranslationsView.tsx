"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonGroup } from "flowbite-react";

export default function BibleTranslationsViewComponent({
	booksView,
	translations,
  bibleId
}: {
	booksView: string;
	translations: any;
  bibleId: string
}) {
  const router = useRouter();
	const [view, setView] = useState(booksView);

  useEffect(() => {

		if (view === translations.detailed) {
			router.push(
				`/biblia/libros/${bibleId}?booksView=${translations.detailed}`
			);
		}

		if (view === translations.compact) {
			router.push(
				`/biblia/libros/${bibleId}?booksView=${translations.compact}`
			);
		}

	}, [view]);

	return (
		<div className="flex items-center justify-center mb-4">
			<ButtonGroup>
				{/* add the translations in a select input */}
				<Button
					color="alternative"
					type="button"
					onClick={() => setView(translations.detailed)}
					className={`${
						view === translations.detailed &&
						"bg-slate-700 text-slate-50 dark:bg-gray-900 text:white hover:text-slate-100 hover:bg-slate-800 dark:hover:bg-gray-900"
					} cursor-pointer hover:bg-slate-800 hover:text-slate-50 dark:hover:bg-gray-900 dark:text-gray-50 transition-all`}>
					Vista {translations.detailed}
				</Button>
				<Button
					color="alternative"
					type="button"
					onClick={() => setView(translations.compact)}
					className={`${
						view === translations.compact &&
						"bg-slate-700 text-slate-50 dark:bg-gray-900 text:white hover:text-slate-100 hover:bg-slate-800 dark:hover:bg-gray-900"
					} cursor-pointer hover:bg-slate-800 hover:text-slate-50 dark:hover:bg-gray-900 dark:text-gray-50 transition-all`}>
					Vista {translations.compact}
				</Button>
			</ButtonGroup>
		</div>
	);
}
