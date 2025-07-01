import Link from "next/link";
import BibleHeaderSection from "@/components/layout/BibleSection";
import { redirect } from "next/navigation";

export default async function BibleBooksPage(
  { params } :
  { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const [BibleInfo, BibleBooks] = await Promise.all([
    fetch(`https://api.scripture.api.bible/v1/bibles/${id}`, {
      method: "GET",
      headers: {
        "api-key": `${process.env.BIBLE_API_KEY}`,
        Accept: "application/json"
      }
    }),
    fetch(`https://api.scripture.api.bible/v1/bibles/${id}/books`, {
      method: "GET",
      headers: {
        "api-key": `${process.env.BIBLE_API_KEY}`,
        Accept: "application/json"
      }
    })
  ])

  const bibleInfo = await BibleInfo.json();
  const books = await BibleBooks.json();

  const pentateuco = books?.data.slice(0, 5);
	const historicos = books?.data.slice(5, 17);
	const poetiocs = books?.data.slice(17, 22);
	const profetas = books?.data.slice(22, 39);
	const evangelios = books?.data.slice(39, 43);
	const historico = books?.data.slice(43, 44);
	const cartas = books?.data.slice(44, 65);
	const revelaciones = books?.data.slice(65, 66);

	return (
		<main>
			<section className="w-full dark:bg-gray-900 text-gray-800">
				<div className="max-w-7xl mx-auto py-16">
          <BibleHeaderSection
            section={bibleInfo.data.nameLocal}
          />
				</div>
			</section>
			<div className="container">
				<h1 className="biblia-header">Libros del Antiguo Testamento</h1>

				<div className="flex">
					<img
						className="biblia-libro-imagen"
						src="/images/bible-icons/pentateucos.png"
					/>
					<h2 className="biblia-libro-indicador">Pentateucos</h2>
				</div>
				<div className="libros">
					{pentateuco?.map((l: any) => (
						<Link
							className="pentateuco"
							key={l.id}
							href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}>
							{l.name}
						</Link>
					))}
				</div>
				<div className="flex">
					<img
						className="biblia-libro-imagen"
						src="/images/bible-icons/historia.png"
					/>
					<h2 className="biblia-libro-indicador">Históricos</h2>
				</div>
				<div className="libros">
					{historicos?.map((l: any) => (
						<Link
							className="historicos"
							key={l.id}
							href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}>
							{l.name}
						</Link>
					))}
				</div>
				<div className="flex">
					<img
						className="biblia-libro-imagen"
						src="/images/bible-icons/poeticos.png"
					/>
					<h2 className="biblia-libro-indicador">Poéticos</h2>
				</div>
				<div className="libros">
					{poetiocs?.map((l: any) => (
						<Link
							className="poeticos"
							key={l.id}
							href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}>
							{l.name}
						</Link>
					))}
				</div>
				<div className="flex">
					<img
						className="biblia-libro-imagen"
						src="/images/bible-icons/profetas.png"
					/>
					<h2 className="biblia-libro-indicador">Profetas</h2>
				</div>
				<div className="libros">
					{profetas?.map((l: any) => (
						<Link
							className="profetas"
							key={l.id}
							href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}>
							{l.name}
						</Link>
					))}
				</div>
				<h1 className="biblia-header">Libros del Nuevo Testamento</h1>
				<div className="flex">
					<img
						className="biblia-libro-imagen"
						src="/images/bible-icons/evangelios.png"
					/>
					<h2 className="biblia-libro-indicador">Evangelios</h2>
				</div>
				<div className="libros">
					{evangelios?.map((l: any) => (
						<Link
							className="evangelicos"
							key={l.id}
							href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}>
							{l.name}
						</Link>
					))}
				</div>
				<div className="flex">
					<img
						className="biblia-libro-imagen"
						src="/images/bible-icons/historia.png"
					/>
					<h2 className="biblia-libro-indicador">Historia</h2>
				</div>
				<div className="libros">
					{historico?.map((l: any) => (
						<Link
							className="historicos"
							key={l.id}
							href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}>
							{l.name}
						</Link>
					))}
				</div>
				<div className="flex">
					<img
						className="biblia-libro-imagen"
						src="/images/bible-icons/cartas.png"
					/>
					<h2 className="biblia-libro-indicador">Cartas</h2>
				</div>
				<div className="libros">
					{cartas?.map((l: any) => (
						<Link
							className="cartas"
							key={l.id}
							href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}>
							{l.name}
						</Link>
					))}
				</div>
				<div className="flex">
					<img
						className="biblia-libro-imagen"
						src="/images/bible-icons/revelaciones.png"
					/>
					<h2 className="biblia-libro-indicador">Revelaciones</h2>
				</div>
				<div className="libros">
					{revelaciones?.map((l: any) => (
						<Link
							className="revelaciones"
							key={l.id}
							href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}>
							{l.name}
						</Link>
					))}
				</div>
			</div>
		</main>
	);
}