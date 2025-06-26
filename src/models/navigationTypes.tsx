export interface NavigationItemType {
    name: string;
    href: string;
}

export interface PaginationControlsProps {
	totalPages: number;
	currentPage: number;
	totalItems: number | undefined;
	limit: number | undefined;
}

export interface PaginatedResponse {
	data: {
		articles: BlogPost[];
		totalItems: number;
		totalPages: number;
		currentPage: number;
	};
}

export interface BlogPost {
	id: number;
	title: string;
	// ... other properties
}