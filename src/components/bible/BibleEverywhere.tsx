"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronLeft,
  Book,
  Globe,
  Hash,
  List,
  Loader2,
  X,
  Pencil // Imported Pencil icon for the edit buttons
} from "lucide-react";
import { BibleDataType, BibleBookType } from "@/models/bibleTypes";
import RoundedButtonWithLordIcon from "@/components/RoundedButtonWithLordIcon";

interface ChapterContent {
  type: string;
  number?: string | number;
  content?: string[] | string;
}

interface ChapterResponse {
  chapter: {
    content: ChapterContent[];
    number: number;
  };
}

interface Selection {
  translation?: BibleDataType;
  book?: BibleBookType;
  chapter?: number;
  verses?: number[];
}

type Step =
  | "initial"
  | "translation"
  | "book"
  | "chapter"
  | "verse"
  | "complete";

// --- Main Component ---

export default function BibleEverywhere() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("initial");
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState<Selection>({});

  // Data State
  const [translations, setTranslations] = useState<BibleDataType[]>([]);
  const [books, setBooks] = useState<BibleBookType[]>([]);
  const [availableVerses, setAvailableVerses] = useState<number[]>([]);
  const [chapterText, setChapterText] = useState<Record<number, string>>({});

  // Search/Filter State
  const [searchQuery, setSearchQuery] = useState("");

  // --- API Fetching Functions ---

  const fetchTranslations = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://bible.helloao.org/api/available_translations.json"
      );
      const data = await res.json();

      // Filter for Spanish translations only
      const spanish = data.translations.filter((sb: any) =>
        sb.language.toLowerCase().includes("spa")
      );

      setTranslations(spanish || []);
    } catch (error) {
      console.error("Failed to fetch translations", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async (translationId: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://bible.helloao.org/api/${translationId}/books.json`
      );
      const data = await res.json();
      setBooks(data.books || []);
    } catch (error) {
      console.error("Failed to fetch books", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChapterAndParseVerses = async (
    translationId: string,
    bookId: string,
    chapter: number
  ) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://bible.helloao.org/api/${translationId}/${bookId}/${chapter}.json`
      );
      const data: ChapterResponse = await res.json();

      // Extract unique verse numbers and text content
      const foundVerses = new Set<number>();
      const textMap: Record<number, string> = {};

      if (data.chapter && Array.isArray(data.chapter.content)) {
        data.chapter.content.forEach((item) => {
          if (item.type === "verse" && item.number) {
            const verseNum = parseInt(item.number.toString(), 10);
            foundVerses.add(verseNum);

            // Extract text content
            if (Array.isArray(item.content)) {
              textMap[verseNum] = item.content.join(" ");
            } else if (typeof item.content === "string") {
              textMap[verseNum] = item.content;
            }
          }
        });
      }

      // Sort verses numerically
      setAvailableVerses(Array.from(foundVerses).sort((a, b) => a - b));
      setChapterText(textMap);
    } catch (error) {
      console.error("Failed to fetch chapter", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Event Handlers ---

  const handleOpen = () => {
    setIsOpen(true);
    setStep("translation");
    setSelection({});
    fetchTranslations();
  };

  // Helper to jump to a specific edit step
  const handleEditStep = (targetStep: Step) => {
    setIsOpen(true);
    setStep(targetStep);

    // If jumping to 'book' or 'verse' steps, ensure we have the data
    // (Data usually persists in state, but this logic ensures specific fetch if needed could go here)
    if (targetStep === "translation") {
        fetchTranslations();
    }
    // 'book' uses 'books' state which persists
    // 'chapter' uses 'selection.book' which persists
    // 'verse' uses 'availableVerses' which persists
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep("initial");
    setSearchQuery("");
  };

  const handleSelectTranslation = (t: BibleDataType) => {
    setSelection({ translation: t });
    setSearchQuery("");
    setStep("book");
    fetchBooks(t.id);
  };

  const handleSelectBook = (b: BibleBookType) => {
    setSelection((prev) => ({
      translation: prev.translation,
      book: b,
    }));
    setSearchQuery("");
    setStep("chapter");
  };

  const handleSelectChapter = (c: number) => {
    setSelection((prev) => ({
      ...prev,
      chapter: c,
      verses: [],
    }));
    setStep("verse");
    if (selection.translation && selection.book) {
      fetchChapterAndParseVerses(
        selection.translation.id,
        selection.book.id,
        c
      );
    }
  };

  const handleSelectVerse = (v: number) => {
    setSelection((prev) => {
      const currentVerses = prev.verses || [];

      // Logic for range selection
      if (currentVerses.length === 0) {
        // Select first verse
        return { ...prev, verses: [v] };
      } else if (currentVerses.length === 1) {
        const start = currentVerses[0];

        // Toggle off if clicking the same verse again
        if (start === v) {
          return { ...prev, verses: [] };
        }

        // Select second verse (creates range)
        const end = v;
        return { ...prev, verses: start < end ? [start, end] : [end, start] };
      } else {
        // Reset and select new start verse if a range already exists
        return { ...prev, verses: [v] };
      }
    });
  };

  const handleConfirmSelection = () => {
    setStep("complete");
    setIsOpen(false);
  };

  const handleBack = () => {
    setSearchQuery("");
    if (step === "book") setStep("translation");
    if (step === "chapter") setStep("book");
    if (step === "verse") setStep("chapter");
  };

  // --- Filtering Logic ---

  const filteredTranslations = useMemo(() => {
    if (!searchQuery) return translations;
    const lower = searchQuery.toLowerCase();
    return translations.filter(
      (t) =>
        t.name.toLowerCase().includes(lower) ||
        t.englishName.toLowerCase().includes(lower) ||
        t.id.toLowerCase().includes(lower)
    );
  }, [translations, searchQuery]);

  const filteredBooks = useMemo(() => {
    if (!searchQuery) return books;
    const lower = searchQuery.toLowerCase();
    return books.filter(
      (b) =>
        b.name.toLowerCase().includes(lower) ||
        b.commonName.toLowerCase().includes(lower) ||
        b.id.toLowerCase().includes(lower)
    );
  }, [books, searchQuery]);

  // --- Render Helpers ---

  const renderHeader = (title: string, icon: React.ReactNode) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <div className="flex items-center gap-2">
        {step !== "translation" && (
          <button
            onClick={handleBack}
            className="p-1 hover:bg-gray-200 rounded-full transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          {icon}
          <span>{title}</span>
        </div>
      </div>
      <button
        onClick={handleClose}
        className="p-1 hover:bg-gray-200 rounded-full transition"
      >
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );

  const renderSearch = (placeholder: string) => (
    <div className="p-4 border-b border-gray-100">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      </div>
    </div>
  );

  // --- Views ---

  const renderTranslations = () => (
		<div className="flex flex-col h-full">
			{renderHeader(
				"Selecciona una traducción",
				<Globe className="w-5 h-5 text-blue-600" />
			)}
			{renderSearch("Selecciona una traducción (e.g. RV60, Spanish)...")}
			<div className="flex-1 overflow-y-auto p-2">
				{loading ? (
					<div className="flex justify-center p-8">
						<Loader2 className="w-8 h-8 animate-spin text-blue-500" />
					</div>
				) : (
					<div className="grid gap-2">
						{filteredTranslations.map((t) => (
							<button
								key={t.id}
								onClick={() => handleSelectTranslation(t)}
								className="text-left px-4 py-3 hover:bg-blue-50 rounded-lg transition border border-transparent hover:border-blue-100 group">
								<div className="font-medium text-gray-900 group-hover:text-blue-700">
									{t.name}
								</div>
								<div className="text-xs text-gray-500 flex items-center gap-2">
									<span className="uppercase bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono text-[10px]">
										{t.id}
									</span>
									<span>{t.language === "spa" && "español"}</span>
								</div>
							</button>
						))}
						{filteredTranslations.length === 0 && (
							<div className="text-center p-4 text-gray-500">
								No translations found.
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);

  const renderBooks = () => (
    <div className="flex flex-col h-full">
      {renderHeader(
        selection.translation?.englishName || "Select Book",
        <Book className="w-5 h-5 text-blue-600" />
      )}
      {renderSearch("Search books (e.g. Genesis)...")}
      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filteredBooks.map((b) => (
              <button
                key={b.id}
                onClick={() => handleSelectBook(b)}
                className="text-left px-4 py-3 hover:bg-blue-50 rounded-lg transition border border-transparent hover:border-blue-100 group flex justify-between items-center"
              >
                <span className="font-medium text-gray-900 group-hover:text-blue-700">
                  {b.name}
                </span>
                <span className="text-xs text-gray-400 hidden group-hover:inline-block">
                  Seleccionar
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderChapters = () => (
    <div className="flex flex-col h-full">
      {renderHeader(
        `${selection.book?.name}`,
        <Hash className="w-5 h-5 text-blue-600" />
      )}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">
          Select Chapter
        </h3>
        <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
          {Array.from(
            { length: selection.book?.numberOfChapters || 0 },
            (_, i) => i + 1
          ).map((num) => (
            <button
              key={num}
              onClick={() => handleSelectChapter(num)}
              className="aspect-square flex items-center justify-center rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition font-medium text-gray-700"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVerses = () => {
    const isSelected = (v: number) => {
      if (!selection.verses) return false;
      if (selection.verses.length === 1) return selection.verses[0] === v;
      // Range check
      return v >= selection.verses[0] && v <= selection.verses[1];
    };

    return (
      <div className="flex flex-col h-full">
        {renderHeader(
          `${selection.book?.name} ${selection.chapter}`,
          <List className="w-5 h-5 text-blue-600" />
        )}
        <div className="flex-1 overflow-y-auto p-0">
          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Select Verses
                </h3>
                <div className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                  {selection.verses?.length
                    ? selection.verses.length === 1
                      ? `Verse ${selection.verses[0]}`
                      : `Verses ${selection.verses[0]} - ${selection.verses[1]}`
                    : "Oprime versículo inicial y final"}
                </div>
              </div>

              <div className="flex flex-col">
                {availableVerses.map((num) => {
                  const active = isSelected(num);
                  return (
                    <button
                      key={num}
                      onClick={() => handleSelectVerse(num)}
                      className={`text-left px-4 py-3 border-b border-gray-100 transition flex gap-3 hover:bg-gray-50
                        ${active ? "bg-blue-50 hover:bg-blue-50" : ""}
                      `}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-medium text-sm transition
                          ${
                            active
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-500"
                          }
                        `}
                      >
                        {num}
                      </div>
                      <div className={`text-sm leading-relaxed ${active ? "text-gray-900" : "text-gray-600"}`}>
                        {chapterText[num] || "..."}
                      </div>
                    </button>
                  );
                })}
                {availableVerses.length === 0 && !loading && (
                  <div className="text-center text-gray-400 py-8">
                    No verses found for this chapter.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg sticky bottom-0 z-20">
          <button
            disabled={!selection.verses || selection.verses.length === 0}
            onClick={handleConfirmSelection}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    );
  };

  // --- Display Result ---

  const formatSelection = () => {
    if (!selection.translation || !selection.book || !selection.chapter)
      return null;
    const verseFrom = selection?.verses && selection?.verses[0];
    const verseTo = selection?.verses && selection?.verses[selection?.verses.length - 1];
    const versiclesValue =
      verseFrom !== verseTo ?
      verseFrom + " - " + verseTo :
      verseFrom;

    // Generate preview text
    let selectedText = "";

    // if (v && v.length > 0) {
    //     const start = v[0];
    //     const end = v.length === 2 ? v[1] : start;
    //     const textParts = [];
    //     for (let i = start; i <= end; i++) {
    //         if (chapterText[i]) {
    //             textParts.push(`${i} ${chapterText[i]}`);
    //         }
    //     }
    //     selectedText = textParts.join("\n");
    // }

    // Helper component for edit rows
    const EditRow = ({ label, value, stepName }: { label: string, value: string | undefined, stepName: Step }) => (
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 last:border-0 last:pb-0">
        <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-semibold uppercase">{label}</span>
            <span className="font-medium text-gray-800">{value}</span>
        </div>
        <button
            onClick={() => handleEditStep(stepName)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
            title={`Edit ${label}`}
        >
            <Pencil className="w-4 h-4" />
        </button>
      </div>
    );

    return (
			<div className="mt-6 p-6 bg-white border border-gray-200 rounded-xl shadow-sm max-w-md mx-auto w-full">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-bold text-gray-900">Tu selección:</h2>
					<button
						onClick={handleOpen}
						className="text-sm text-blue-600 hover:underline">
						Reiniciar
					</button>
				</div>

				<div className="flex flex-col gap-3 text-sm font-mono text-gray-600 bg-gray-50 p-4 rounded-lg">
					<EditRow
						label="Traducción"
						value={selection.translation?.id}
						stepName="translation"
					/>
					<EditRow label="Libro" value={selection.book?.name} stepName="book" />
					<EditRow
						label="Capítulo"
						value={selection.chapter?.toString()}
						stepName="chapter"
					/>
					<EditRow
						label="Versículo(s)"
						value={String(versiclesValue)}
						stepName="verse"
					/>
				</div>

				{selectedText && (
					<div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 italic border-l-4 border-blue-200 max-h-60 overflow-y-auto shadow-inner">
						<pre className="whitespace-pre-wrap font-sans font-normal leading-relaxed text-gray-600">
							{selectedText}
						</pre>
					</div>
				)}

				<div>
					<RoundedButtonWithLordIcon
						text="Ir al capítulo"
						route={`/biblia/libros/capitulos/versiculos/${selection.translation?.id}/${selection.book?.id}/${selection.chapter}#${verseFrom}`}
					/>
				</div>
			</div>
		);
  };

  return (
    <div className="font-sans text-gray-900 flex flex-col items-start justify-start w-full">
      {/* Trigger Button (Only shown if initial or complete) */}
      {!isOpen && (
        <>
          {step === "complete" ? (
            formatSelection()
          ) : (
            <button
              onClick={handleOpen}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition flex items-center gap-2"
            >
              <Book className="w-5 h-5" />
              Selecciona el pasaje bíblico
            </button>
          )}
        </>
      )}

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Modal Content */}
          <div className="bg-white w-full max-w-lg h-[600px] rounded-xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden">
            {step === "translation" && renderTranslations()}
            {step === "book" && renderBooks()}
            {step === "chapter" && renderChapters()}
            {step === "verse" && renderVerses()}
          </div>
        </div>
      )}
    </div>
  );
}