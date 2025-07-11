export interface LanguageContextType {
	language: string;

	setLanguage: React.Dispatch<React.SetStateAction<string>>;

	verifyLanguageFromLocalStorage: () => string;

	setLanguageAndLocalStorage: (lang: string) => any;
}

export interface AuthContextType {
	user: any | null;
	signOutUser: () => void;
	persistUser: () => Promise<void>;
}
