"use client";
import { FetchEndpoints } from "@/static";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SubscriberForm() {
	const [email, setEmail] = useState<string>("");

	const handleEmailSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const request = await fetch(FetchEndpoints.Users.Post, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email })
			});

			const response = await request.json();

			if (response.success) {
				setEmail("");

				toast.success(response.message);
			}
		} catch (error) {
			console.error("Error submitting email:", error);
		}
	};

	return (
		<form className="" onSubmit={handleEmailSubmit}>
			<div className="flex items-center flex-wrap mb-3">
				<div className="relative w-full md:w-auto md:mr-3">
					<label
						htmlFor="member_email"
						className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
						Correo Electrónico
					</label>
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
						</svg>
					</div>
					<input
						className="block bg-sky-50 dark:bg-gray-700 w-full md:w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-2xl  focus:ring-sky-500 focus:border-sky-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
						placeholder="Ingresa tu correo electrónico"
						type="email"
						name="email"
						id="member_email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="text-sm text-left text-gray-500 dark:text-gray-300 p-1 max-w-[80ch]">
					Suscríbete y se el primero en enterarte de nuevo contenido y
					funcionalidades.
				</div>
				<div className="w-full flex justify-end md:justify-start md:mt-2">
					<input
						type="submit"
						value="Suscríbete"
						className="p-4 text-sm font-medium text-center text-white dark:text-gray-50 rounded-2xl cursor-pointer bg-sky-700 hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all duration-300 ease-in border border-sky-100 dark:border-gray-600 mt-4 md:mt-0"
						name="member_submit"
						id="member_submit"
					/>
				</div>
			</div>
		</form>
	);
}
