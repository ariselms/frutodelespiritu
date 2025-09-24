// /components/bible/ReferenceTagger.tsx
"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import ReactDOM from "react-dom";

// Simplified mapping for Spanish book names only.
// A mapping of Spanish book names to the short abbreviations the API expects.
const bookMappings: { [key: string]: string } = {
  // Old Testament
  "génesis": "Gen", "éxodo": "Exo", "levítico": "Lev", "números": "Num",
  "deuteronomio": "Deu", "josué": "Jos", "jueces": "Jud", "rut": "Rut",
  "1 samuel": "1Sa", "2 samuel": "2Sa", "1 reyes": "1Ki", "2 reyes": "2Ki",
  "1 crónicas": "1Ch", "2 crónicas": "2Ch", "esdras": "Ezr", "nehemías": "Neh",
  "ester": "Est", "job": "Job", "salmos": "Psa", "proverbios": "Pro",
  "eclesiastés": "Ecc", "cantar de los cantares": "Son", "cantares": "Son",
  "isaías": "Isa", "jeremías": "Jer", "lamentaciones": "Lam", "ezequiel": "Eze",
  "daniel": "Dan", "oseas": "Hos", "joel": "Joe", "amós": "Amo", "abdías": "Oba",
  "jonás": "Jon", "miqueas": "Mic", "nahúm": "Nah", "habacuc": "Hab",
  "sofonías": "Zep", "hageo": "Hag", "zacarías": "Zec", "malaquías": "Mal",
  // New Testament
  "mateo": "Mat", "marcos": "Mar", "lucas": "Luk", "juan": "Joh", "hechos": "Act",
  "romanos": "Rom", "1 corintios": "1Co", "2 corintios": "2Co",
  "gálatas": "Gal", "efesios": "Eph", "filipenses": "Php", "colosenses": "Col",
  "1 tesalonicenses": "1Th", "2 tesalonicenses": "2Th", "1 timoteo": "1Ti",
  "2 timoteo": "2Ti", "tito": "Tit", "filemón": "Phm", "hebreos": "Heb",
  "santiago": "Jam", "1 pedro": "1Pe", "2 pedro": "2Pe", "1 juan": "1Jn",
  "2 juan": "2Jn", "3 juan": "3Jn", "judas": "Jud", "apocalipsis": "Rev"
};

const Tooltip = ({ content, position }: { content: string; position: { x: number; y: number } }) => {
  if (!content) return null;
  const style: React.CSSProperties = {
    position: 'fixed', top: `${position.y}px`, left: `${position.x}px`,
    transform: 'translate(10px, -100%)', backgroundColor: 'white', color: '#333',
    border: '1px solid #ccc', borderRadius: '8px', padding: '12px', zIndex: 1000,
    maxWidth: '350px', maxHeight: '300px', overflowY: 'auto',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', pointerEvents: 'none',
    fontSize: '14px', lineHeight: '1.5',
  };
  return <div style={style} dangerouslySetInnerHTML={{ __html: content }} />;
};


type ReferenceTaggerProps = {
  children: ReactNode;
  translation?: string;
};

const ReferenceTagger = ({ children, translation = "spa_pdt" }: ReferenceTaggerProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [portal, setPortal] = useState<React.ReactPortal | null>(null);

  useEffect(() => {
    // This safely creates the tooltip outside of the main content flow to avoid style conflicts.
    setPortal(ReactDOM.createPortal(<Tooltip content={tooltipContent} position={tooltipPosition} />, document.body));
  }, [tooltipContent, tooltipPosition]);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const bookNamesRegexPart = Object.keys(bookMappings).join("|");
    // This flexible regex finds references with or without specific verses (e.g., "Juan 3" or "Juan 3:16").
    const bibleRefRegex = new RegExp(`(?:${bookNamesRegexPart})\\s+\\d+(?::\\d+(?:-\\d+)?)?`, "gi");

    // This safely finds all text nodes without disturbing the HTML structure.
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(container, Node.TEXT_NODE, null);
    let node;
    while ((node = walker.nextNode())) { textNodes.push(node as Text); }

    // This surgical approach replaces text with interactive tags, preserving your CSS styles.
    textNodes.forEach(node => {
      const text = node.nodeValue;
      if (!text) return;

      bibleRefRegex.lastIndex = 0;
      if (!bibleRefRegex.test(text)) return;
      bibleRefRegex.lastIndex = 0;

      const fragments: (Node | string)[] = [];
      let lastIndex = 0;
      let match;

      while ((match = bibleRefRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          fragments.push(text.substring(lastIndex, match.index));
        }
        const span = document.createElement("span");
        span.textContent = match[0];
        span.className = "bible-reference";
        span.dataset.ref = match[0];
        span.style.textDecoration = "underline";
        span.style.textDecorationStyle = "dotted";
        span.style.cursor = "pointer";
        fragments.push(span);
        lastIndex = bibleRefRegex.lastIndex;
      }

      if (lastIndex < text.length) {
        fragments.push(text.substring(lastIndex));
      }

      if (fragments.length > 1) {
          node.replaceWith(...fragments);
      }
    });

    const references = container.querySelectorAll<HTMLElement>(".bible-reference");
    references.forEach(refElement => {
      const handleMouseEnter = async (event: MouseEvent) => {
        setIsTooltipVisible(true);
        setTooltipContent("<em>Cargando...</em>");
        setTooltipPosition({ x: event.clientX, y: event.clientY });

        const reference = refElement.dataset.ref || "";
        const parseRegex = new RegExp(`^(${bookNamesRegexPart})\\s+(\\d+)(?::(\\d+)(?:-(\\d+))?)?$`, "i");
        const match = reference.match(parseRegex);

        if (!match) {
          setTooltipContent("Error: Referencia no válida.");
          return;
        }

        const [, book, chapter, startVerse, endVerse] = match;
        const bookKey = book.trim().toLowerCase();
        const apiBook = bookMappings[bookKey];

        // console.log("Translation: ", translation);
        // console.log("API Book: ", apiBook);
        // console.log("Chapter: ", chapter);

        if (apiBook) {
          try {
            // 1. Constructs the correct CHAPTER-ONLY URL for the helloao API.
            const url = `https://bible.helloao.org/api/${translation}/${apiBook}/${chapter}.json`;

            // 2. Fetches the entire chapter's data.
            const response = await fetch(url);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();

            // 3. Filters the results to get only the requested verses.
            const firstVerse = parseInt(startVerse || "1", 10);
            const lastVerse = parseInt(endVerse || startVerse || "999", 10);

            const requestedVerses = data.content.filter((verse: any) => {
                const verseNum = parseInt(verse.number, 10);
                return verseNum >= firstVerse && verseNum <= lastVerse;
            });

            // 4. Formats the filtered verses to display in the tooltip.
            const verseText = requestedVerses.map((v: any) =>
                `<strong>${v.number}</strong> ${v.content.join(" ")}`
            ).join(" ");

            if (verseText) {
                setTooltipContent(`<strong>${reference}</strong><br/>${verseText}`);
            } else {
                setTooltipContent(`<strong>${reference}</strong><br/><em>No se encontró el texto del versículo.</em>`);
            }

          } catch (error) {
            console.error("Failed to fetch Bible verse:", error);
            setTooltipContent("Error al cargar el versículo.");
          }
        }
      };

      const handleMouseMove = (event: MouseEvent) => {
        setTooltipPosition({ x: event.clientX, y: event.clientY });
      };
      const handleMouseLeave = () => {
        setIsTooltipVisible(false);
        setTooltipContent("");
      };

      refElement.addEventListener("mouseenter", handleMouseEnter);
      refElement.addEventListener("mousemove", handleMouseMove);
      refElement.addEventListener("mouseleave", handleMouseLeave);
    });

  }, [children, translation]);

  return (
    <>
      <div ref={contentRef}>{children}</div>
      {isTooltipVisible && portal}
    </>
  );
};

export default ReferenceTagger;