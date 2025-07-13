import { NavigationItemType } from "@/models/navigationTypes";

export const MainNavigation: NavigationItemType[] = [
  { name: 'Lecturas', href: '/lecturas' },
  { name: 'Biblia', href: '/biblia' },
];

export const FooterNavigation = [];

export const FetchEndpoints = Object.freeze({
  Articles: {
    Post: '/api/articles',
    GetAll: '/api/articles',
    GetOne: (id: string) => `/api/articles/${id}`,
    Update: (id: string) => `/api/articles/${id}`,
    Delete: (id: string) => `/api/articles/${id}`,
    GetByCategory: (categoryId: string) => `/api/articles/category/${categoryId}`,
    GetByUser: (userId: string) => `/api/articles/user/${userId}`,
  },
  Users: {
    Post: '/api/users',
    GetAll: '/api/users',
    GetOne: (id: string) => `/api/users/${id}`,
    Update: (id: string) => `/api/users/${id}`,
    Delete: (id: string) => `/api/users/${id}`,
    GetByEmail: (email: string) => `/api/users/email/${email}`,
    GetByRole: (role: string) => `/api/users/role/${role}`,
  },
  Categories: {
    POST: '/api/categories',
    GetAll: '/api/categories',
    GetOne: (id: string) => `/api/categories/${id}`,
    Update: (id: string) => `/api/categories/${id}`,
    Delete: (id: string) => `/api/categories/${id}`,
    GetByName: (name: string) => `/api/categories/name/${name}`,
  }
});

// Determine the base URL based on the environment
let baseUrl;

if (process.env.NEXT_PUBLIC_VERCEL_ENV === "development") {
	baseUrl = "http://localhost:3000";
}

if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
	baseUrl = "https://frutodelespiritu-dev.vercel.app";
}

if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
	baseUrl = "https://frutodelespiritu.vercel.app/";
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