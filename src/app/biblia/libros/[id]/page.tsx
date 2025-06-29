import Link from "next/link";

export default async function BibleBooksPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const request = await fetch(`https://api.scripture.api.bible/v1/bibles/${id}/books`, {
    method: "GET",
    headers: {
      "api-key": `${process.env.BIBLE_API_KEY}`,
      Accept: "application/json"
    }
  });

  const response = await request.json();

  const pentateuco = response?.data.slice(0, 5);
	const historicos = response?.data.slice(5, 17);
	const poetiocs = response?.data.slice(17, 22);
	const profetas = response?.data.slice(22, 39);
	const evangelios = response?.data.slice(39, 43);
	const historico = response?.data.slice(43, 44);
	const cartas = response?.data.slice(44, 65);
	const revelaciones = response?.data.slice(65, 66);

  console.log(pentateuco);
  console.log(historicos);
  console.log(poetiocs);
  console.log(profetas);
  console.log(evangelios);
  console.log(historico);
  console.log(cartas);
  console.log(revelaciones);

	return (
		<main>
			<section className="w-full bg-orange-400 dark:bg-gray-900 text-white">
				<div className="max-w-7xl mx-auto py-16">
					<h1>Libro: {id}</h1>
				</div>
			</section>
      <div className='container'>
                <h1 className='biblia-header'>Libros del Antiguo Testamento</h1>

                <div className='flex'>
                    <img
                        className='biblia-libro-imagen'
                        src='/images/bible-icons/pentateucos.png'
                    />
                    <h2 className='biblia-libro-indicador'>Pentateucos</h2>
                </div>
                <div className='libros'>
                    {pentateuco?.map((l:any) => (
                        <Link
                            className='pentateuco'
                            key={l.id}
                            href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>
                <div className='flex'>
                    <img
                        className='biblia-libro-imagen'
                        src='/images/bible-icons/historia.png'
                    />
                    <h2 className='biblia-libro-indicador'>Históricos</h2>
                </div>
                <div className='libros'>
                    {historicos?.map((l:any) => (
                        <Link
                            className='historicos'
                            key={l.id}
                            href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>
                <div className='flex'>
                    <img
                        className='biblia-libro-imagen'
                        src='/images/bible-icons/poeticos.png'
                    />
                    <h2 className='biblia-libro-indicador'>Poéticos</h2>
                </div>
                <div className='libros'>
                    {poetiocs?.map((l:any) => (
                        <Link
                            className='poeticos'
                            key={l.id}
                            href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>
                <div className='flex'>
                    <img
                        className='biblia-libro-imagen'
                        src='/images/bible-icons/profetas.png'
                    />
                    <h2 className='biblia-libro-indicador'>Profetas</h2>
                </div>
                <div className='libros'>
                    {profetas?.map((l:any) => (
                        <Link
                            className='profetas'
                            key={l.id}
                            href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>
                <h1 className='biblia-header'>Libros del Nuevo Testamento</h1>
                <div className='flex'>
                    <img
                        className='biblia-libro-imagen'
                        src='/images/bible-icons/evangelios.png'
                    />
                    <h2 className='biblia-libro-indicador'>Evangelios</h2>
                </div>
                <div className='libros'>
                    {evangelios?.map((l:any) => (
                        <Link
                            className='evangelicos'
                            key={l.id}
                            href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>
                <div className='flex'>
                    <img
                        className='biblia-libro-imagen'
                        src='/images/bible-icons/historia.png'
                    />
                    <h2 className='biblia-libro-indicador'>Historia</h2>
                </div>
                <div className='libros'>
                    {historico?.map((l:any) => (
                        <Link
                            className='historicos'
                            key={l.id}
                            href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>
                <div className='flex'>
                    <img
                        className='biblia-libro-imagen'
                        src='/images/bible-icons/cartas.png'
                    />
                    <h2 className='biblia-libro-indicador'>Cartas</h2>
                </div>
                <div className='libros'>
                    {cartas?.map((l:any) => (
                        <Link
                            className='cartas'
                            key={l.id}
                            href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>
                <div className='flex'>
                    <img
                        className='biblia-libro-imagen'
                        src='/images/bible-icons/revelaciones.png'
                    />
                    <h2 className='biblia-libro-indicador'>Revelaciones</h2>
                </div>
                <div className='libros'>
                    {revelaciones?.map((l:any) => (
                        <Link
                            className='revelaciones'
                            key={l.id}
                            href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>
            </div>
		</main>
	);
}