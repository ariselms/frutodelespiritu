export interface ArticleType {
  id: number;
  image_url: string;
  title: string;
  summary: string;
  category_id: number;
  slug: string;
  by_user_id: number;
  content: string;
  video_url: string;
  draft: boolean;
  created_at: Date | string;
  updated_at: Date | string;
  is_featured: boolean;
  // to use with joins, make them optional
  author_name?: string;
  author_role?: string;
  author_image_url?: string;
  category_name?: string;
}

export interface CategoryType {
  id: number;
  name: string;
  user_by_id: number;
  created_at: Date | string;
  updated_at: Date | string;
}