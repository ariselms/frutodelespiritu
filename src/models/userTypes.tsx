export interface User {
	id?: number;
	full_name: string;
	email: string;
	tel: string;
	role: string;
	email_code_number: string;
	email_code_expiration: Date;
	organization_id: number | null;
	email_confirmed: boolean;
	session_token: string | null;
  session_token_expiration: Date | null;
}

export interface UserLogin {
  email: string;
}

export interface UserCode {
  code: string;
}