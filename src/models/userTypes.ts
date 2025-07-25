export interface UserType {
	id?: number;
	name: string;
	contact_email: string;
	contact_phone: string;
	image_url: string;
	role: string;
	bio: string;
	session_token?: string | null;
	session_expiration?: Date | string;
	email_code_number?: string;
	email_code_expiration?: Date | string;
	created_at?: Date | string;
	updated_at?: Date | string;
	address_street?: string;
	address_city?: string;
	address_state?: string;
	address_zip?: string;
	address_country?: string;
}

export interface UserLogin {
	email: string;
}

export interface UserCode {
	code: string;
}