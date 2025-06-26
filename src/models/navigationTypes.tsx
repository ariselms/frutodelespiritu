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