export interface User {
	id?: number;
	name: string;
	contact_email: string;
	contact_phone: string;
  image_url: string;
	role: string;
  bio: string;
	session_token: string | null;
  session_expiration: Date | string;
	email_code_number: string;
	email_code_expiration: Date | string;
	created_at: Date | string;
  updated_at: Date | string;
}

export interface UserLogin {
  email: string;
}

export interface UserCode {
  code: string;
}