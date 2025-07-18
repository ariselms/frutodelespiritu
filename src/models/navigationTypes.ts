import Ract from 'react';

export interface NavigationItemType {
  name: string;
  href: string;
}

export interface NavigationItemTypeWithAuth {
	name: string;
	description: string;
	icon?: Ract.ReactNode;
	href: string;
	requiresAdmin?: boolean;
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