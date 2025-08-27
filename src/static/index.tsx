import { NavigationItemType, NavigationItemTypeWithAuth } from "@/models/navigationTypes";

export const MainNavigation: NavigationItemType[] = [
  { name: 'Lecturas', href: '/lecturas' },
  { name: 'Biblia', href: '/biblia' },
];

export const UserProfileNavigation: NavigationItemTypeWithAuth[] = [
	{
		name: "Biblia",
		description:
			"Administra tus notas y documentos relacionados con la Biblia. Esta función estará disponible pronto.",
		href: "/perfil/biblia",
		requiresAdmin: false
	},
	{
		name: "Memorización",
		description:
			"Los versículos biblicos que has guardado para memorizar.",
		href: "/perfil/memorizacion",
		requiresAdmin: false
	},
	{
		name: "Lecturas",
		description:
			"Administra tus lecturas guardadas, así como tus recortes y notas relacionadas a las lecturas. Esta función estará muy pronto.",
		href: "/perfil/lecturas",
		requiresAdmin: false
	},
	{
		name: "Órdenes",
		description:
			"Administra tus órdenes y revisa tu historial de compras. Esta función estará disponible en el 2026.",
		href: "/perfil/ordenes",
		requiresAdmin: false
	},
	{
		name: "Panel Administrador",
		description: "Administra tus publicaciones, categorias y usuarios.",
		href: "/perfil/admin",
		requiresAdmin: true
	}
];

export const FooterNavigation = [];

export const FetchEndpoints = Object.freeze({
	Articles: {
		Post: "/api/articles",
		GetAll: "/api/articles",
		GetOne: (id: string) => `/api/articles/${id}`,
		Update: (id: string) => `/api/articles/${id}`,
		Delete: (id: string) => `/api/articles/${id}`,
		GetByCategory: (categoryId: string) =>
			`/api/articles/category/${categoryId}`,
		GetByUser: (userId: string) => `/api/articles/user/${userId}`,
		GetLectureSavedByUser: (lectureId: string, userId: string) =>
			`/api/user/lectures?lectureId=${lectureId}&userId=${userId}`,
		PostLectureSaveByUser: "/api/user/lectures"
	},
	Users: {
		Post: "/api/user",
		PostWithFilename: (filename: string) =>
			`/api/user/profile?filename=${filename}`,
		GetAll: "/api/user",
		GetOne: (id: string) => `/api/user/${id}`,
		Update: "/api/user/profile",
		Delete: (id: string) => `/api/users/${id}`,
		GetByEmail: (email: string) => `/api/users/email/${email}`,
		GetByRole: (role: string) => `/api/users/role/${role}`
	},
	Categories: {
		POST: "/api/categories",
		GetAll: "/api/categories",
		GetOne: (id: string) => `/api/categories/${id}`,
		Update: (id: string) => `/api/categories/${id}`,
		Delete: (id: string) => `/api/categories/${id}`,
		GetByName: (name: string) => `/api/categories/name/${name}`
	},
	Log: {
		Post: "/api/log",
	},
	Auth: {
		Post: "/api/auth",
		DeleteSession: "/api/auth",
		PersistUser: "/api/auth"
	},
	BibleApiBase: {
		GetSpanishBibles: (bibleId: string) =>
			`https://api.scripture.api.bible/v1/bibles/${bibleId}`,
		GetSpanishBibleBooks: (bibleId: string) =>
			`https://api.scripture.api.bible/v1/bibles/${bibleId}/books`,
		GetSpanishBookInfo: (bibleId: string, bookId: string) =>
			`https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}`,
		GetSpanishBookChapters: (bibleId: string, bookId: string) =>
			`https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters`,
		GetSpansihBookChapterVerses: (bibleId: string, chapterId: string) =>
			`https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}`,
		SearchBibleVerses: (bibleKeywordSearch: string) =>
			`https://api.scripture.api.bible/v1/bibles/592420522e16049f-01/search?query=${bibleKeywordSearch}&limit=20`,
    GetBiblePassage: (bibleId: string, passage: string) =>
      `https://api.scripture.api.bible/v1/bibles/${bibleId}/passages/${passage}`
	}
});

export const BibleCrudActions = Object.freeze({
  note: "note",
  memorization: "memorization"
})

// Create a reusable type from the object's shape using `typeof`
export type FetchEndpointsType = typeof FetchEndpoints;

export const DataProvider: any = Object.freeze({
  Lectures: "lectures",
  Articles: "articles",
  Categories: "categories",
  Users: "users",
})

export const BibleIdsPublic: string[] = [
  process.env.NEXT_PUBLIC_BIBLE_RV60,
  process.env.NEXT_PUBLIC_BIBLE_PALABRA_DE_DIOS,
  process.env.NEXT_PUBLIC_LA_SANTA_BIBLIA_ESPANOL,
  process.env.NEXT_PUBLIC_VERSION_BIBLIA_LIBRE
].filter((id): id is string => typeof id === "string" && !!id);

export const BibleIdsPrivate: string[] = [
	process.env.BIBLE_RV60,
	process.env.BIBLE_PALABRA_DE_DIOS,
	process.env.LA_SANTA_BIBLIA_ESPANOL,
	process.env.VERSION_BIBLIA_LIBRE
].filter((id): id is string => typeof id === "string" && !!id);

// Determine the base URL based on the environment
let baseUrl;

if (process.env.NEXT_PUBLIC_VERCEL_ENV === "development") {
	baseUrl = "http://localhost:3000";
}

if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
	baseUrl = "https://frutodelespiritu-dev.vercel.app";
}

if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
	baseUrl = "https://frutodelespiritu.com";
}

export const serverBaseUrl = baseUrl;

export const SeccionesBiblia = {
	Pentateuco:
		"Los primeros cinco libros del Antiguo Testamento, también conocidos como la Torá.",
	LibrosHistoricos:
		"Libros que narran la historia de Israel, desde la conquista de Canaán al exilio.",
	LibrosPoeticos:
		"Libros de sabiduría y poesía que exploran la condición humana y la relación con Dios.",
	LibrosProfeticos:
		"Libros que contienen los mensajes de Dios al pueblo de Israel a través de sus profetas.",
	Evangelios:
		"Los cuatro relatos de la vida, enseñanzas, muerte y resurrección de Jesucristo.",
	HistoriaNuevoTestamento:
		"Narra la historia de los apóstoles y el crecimiento de la iglesia primitiva.",
	CartasApostolicas:
		"Cartas de los apóstoles a las iglesias para instruir, animar y corregir su fe.",
	Apocalipsis:
		"Libro profético que revela el fin de los tiempos y la victoria final de Dios."
};