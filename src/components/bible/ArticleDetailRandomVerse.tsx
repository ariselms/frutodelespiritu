import Link from "next/link";

const bibleVersesWithReference = [
	{
		verse_or_passage: "Juan 3:16",
		text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
		reference: "spa_r09/JHN/3#16"
	},
	{
		verse_or_passage: "Salmo 23:1",
		text: "Jehová es mi pastor; nada me faltará.",
		reference: "spa_r09/PSA/23#1"
	},
	{
		verse_or_passage: "Filipenses 4:13",
		text: "Todo lo puedo en Cristo que me fortalece.",
		reference: "spa_r09/PHP/4#13"
	},
	{
		verse_or_passage: "Mateo 11:28",
		text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
		reference: "spa_r09/MAT/11#28"
	},
	{
		verse_or_passage: "Romanos 8:28",
		text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.",
		reference: "spa_r09/ROM/8#28"
	},
	{
		verse_or_passage: "Isaías 41:10",
		text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.",
		reference: "spa_r09/ISA/41#10"
	},
	{
		verse_or_passage: "Proverbios 3:5-6",
		text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.",
		reference: "spa_r09/PRO/3#5"
	},
	{
		verse_or_passage: "Jeremías 29:11",
		text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
		reference: "spa_r09/JER/29#11"
	},
	{
		verse_or_passage: "1 Corintios 13:4-7",
		text: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece; no hace nada indebido, no busca lo suyo, no se irrita, no guarda rencor; no se goza de la injusticia, mas se goza de la verdad. Todo lo sufre, todo lo cree, todo lo espera, todo lo soporta.",
		reference: "spa_r09/1CO/13#4"
	},
	{
		verse_or_passage: "Josué 1:9",
		text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.",
		reference: "spa_r09/JOS/1#9"
	},
	{
		verse_or_passage: "Salmo 46:1",
		text: "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.",
		reference: "spa_r09/PSA/46#1"
	},
	{
		verse_or_passage: "Hebreos 11:1",
		text: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.",
		reference: "spa_r09/HEB/11#1"
	},
	{
		verse_or_passage: "Gálatas 5:22-23",
		text: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza; contra tales cosas no hay ley.",
		reference: "spa_r09/GAL/5#22"
	},
	{
		verse_or_passage: "Mateo 6:33",
		text: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.",
		reference: "spa_r09/MAT/6#33"
	},
	{
		verse_or_passage: "Juan 14:6",
		text: "Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.",
		reference: "spa_r09/JHN/14#6"
	},
	{
		verse_or_passage: "Romanos 10:9-10",
		text: "que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo. Porque con el corazón se cree para justicia, pero con la boca se confiesa para salvación.",
		reference: "spa_r09/ROM/10#9"
	},
	{
		verse_or_passage: "Isaías 53:5",
		text: "Mas él herido fue por nuestras rebeliones, molido por nuestros pecados; el castigo de nuestra paz fue sobre él, y por su llaga fuimos nosotros curados.",
		reference: "spa_r09/ISA/53#5"
	},
	{
		verse_or_passage: "Apocalipsis 3:20",
		text: "He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él, y cenaré con él, y él conmigo.",
		reference: "spa_r09/APO/3#20"
	},
	{
		verse_or_passage: "Salmo 119:105",
		text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
		reference: "spa_r09/PSA/119#105"
	},
	{
		verse_or_passage: "2 Timoteo 3:16",
		text: "Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia.",
		reference: "spa_r09/2TIM/3#16"
	},
	{
		verse_or_passage: "Filipenses 2:3-4",
		text: "Nada hagáis por contienda o por vanagloria; antes bien con humildad, estimando cada uno a los demás como superiores a sí mismo; no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros.",
		reference: "spa_r09/PHP/2#3"
	},
	{
		verse_or_passage: "Efesios 2:8-9",
		text: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe.",
		reference: "spa_r09/EFE/2#8"
	},
	{
		verse_or_passage: "Colosenses 3:23-24",
		text: "Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres; sabiendo que del Señor recibiréis la recompensa de la herencia, porque a Cristo el Señor servís.",
		reference: "spa_r09/COL/3#23"
	},
	{
		verse_or_passage: "1 Juan 4:7-8",
		text: "Amados, amémonos unos a otros; porque el amor es de Dios. Todo aquel que ama, es nacido de Dios, y conoce a Dios. El que no ama, no ha conocido a Dios; porque Dios es amor.",
		reference: "spa_r09/1JUAN/4#7"
	},
	{
		verse_or_passage: "Lucas 6:31",
		text: "Y como queréis que hagan los hombres con vosotros, así también haced vosotros con ellos.",
		reference: "spa_r09/LUK/6#31"
	},
	{
		verse_or_passage: "Santiago 1:5",
		text: "Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada.",
		reference: "spa_r09/JAS/1#5"
	},
	{
		verse_or_passage: "Salmo 37:4",
		text: "Deléitate asimismo en Jehová, y él te concederá los deseos de tu corazón.",
		reference: "spa_r09/PSA/37#4"
	},
	{
		verse_or_passage: "Mateo 5:14",
		text: "Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder.",
		reference: "spa_r09/MAT/5#14"
	},
	{
		verse_or_passage: "Juan 8:32",
		text: "Y conoceréis la verdad, y la verdad os hará libres.",
		reference: "spa_r09/JHN/8#32"
	},
	{
		verse_or_passage: "Nehemías 8:10",
		text: "Luego les dijo: Id, comed grosuras, y bebed vino dulce, y enviad porciones a los que no tienen nada preparado; porque día santo es a nuestro Señor; y no os entristezcáis, porque el gozo de Jehová es vuestra fuerza.",
		reference: "spa_r09/NEH/8#10"
	},
	{
		verse_or_passage: "Salmo 103:2-3",
		text: "Bendice, alma mía, a Jehová, y no olvides ninguno de sus beneficios. Él es quien perdona todas tus iniquidades, el que sana todas tus dolencias.",
		reference: "spa_r09/PSA/103#2"
	},
	{
		verse_or_passage: "2 Corintios 5:17",
		text: "De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.",
		reference: "spa_r09/2CO/5#17"
	},
	{
		verse_or_passage: "Romanos 12:2",
		text: "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta.",
		reference: "spa_r09/ROM/12#2"
	},
	{
		verse_or_passage: "Proverbios 22:6",
		text: "Instruye al niño en su camino; y aun cuando fuere viejo, no se apartará de él.",
		reference: "spa_r09/PRO/22#6"
	},
	{
		verse_or_passage: "Deuteronomio 6:5",
		text: "Y amarás a Jehová tu Dios de todo tu corazón, y de toda tu alma, y con todas tus fuerzas.",
		reference: "spa_r09/DEU/6#5"
	},
	{
		verse_or_passage: "1 Pedro 5:7",
		text: "echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.",
		reference: "spa_r09/1PE/5#7"
	},
	{
		verse_or_passage: "Zacarías 4:6",
		text: "Entonces respondió y me habló diciendo: Esta es palabra de Jehová a Zorobabel, que dice: No con ejército, ni con fuerza, sino con mi Espíritu, ha dicho Jehová de los ejércitos.",
		reference: "spa_r09/ZEC/4#6"
	},
	{
		verse_or_passage: "Mateo 28:19-20",
		text: "Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo; enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo. Amén.",
		reference: "spa_r09/MAT/28#19"
	},
	{
		verse_or_passage: "Salmo 91:1-2",
		text: "El que habita al abrigo del Altísimo, morará bajo la sombra del Omnipotente. Diré yo a Jehová: Esperanza mía, y castillo mío; mi Dios, en quien confiaré.",
		reference: "spa_r09/PSA/91#1"
	},
	{
		verse_or_passage: "Malaquías 3:10",
		text: "Traed todos los diezmos al alfolí y haya alimento en mi casa; y probadme ahora en esto, dice Jehová de los ejércitos, si no os abriré las ventanas de los cielos, y derramaré sobre vosotros bendición hasta que sobreabunde.",
		reference: "spa_r09/MAL/3#10"
	}
];

// How to use it to show a random verse:
function getRandomBibleVerseWithReference() {
	const randomIndex = Math.floor(
		Math.random() * bibleVersesWithReference.length
	);
	return bibleVersesWithReference[randomIndex];
}

// Example usage:
const randomVerse = getRandomBibleVerseWithReference();

export default function ArticleDetailRandomVerse() {
	return (
		<div className="mb-8 mx-4 lg:mx-0 mt-8 lg:mt-0 bg-orange-50 dark:bg-gray-700 border-1 border-orange-300 dark:border-gray-600 p-4 rounded-2xl text-black dark:text-white">
			<h4 className="text-center">Versículo Destacado</h4>
			<div className="my-10">
				<p className="text-sm font-extrabold">{randomVerse.verse_or_passage}</p>
				<p className="text-sm">{randomVerse.text}</p>
			</div>
			<Link
				className="inline-block px-5 py-3 text-sm font-medium text-center text-orange-700 dark:text-gray-100 rounded-2xl cursor-pointer bg-orange-100 dark:bg-gray-800 border border-orange-300 dark:border-gray-600 focus:ring-4 focus:ring-orange-300  dark:focus:ring-gray-800 w-full"
				href={`/biblia/libros/capitulos/versiculos/${randomVerse.reference}`}>
				Leer Contexto
			</Link>
			<Link
				className="inline-block mt-5 mb-2 px-5 py-3 text-sm font-medium text-center text-orange-700 dark:text-gray-100 rounded-2xl cursor-pointer bg-orange-100 dark:bg-gray-800 border border-orange-300 dark:border-gray-600 focus:ring-4 focus:ring-orange-300  dark:focus:ring-gray-800 w-full"
				href="/biblia">
				Abrir Biblia
			</Link>
		</div>
	);
}
