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
						className="mb-2 ms-1 text-sm font-medium text-gray-900 dark:text-gray-300">
						Correo Electrónico
					</label>
					<input
						className="block bg-sky-50 dark:bg-gray-700 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-2xl  focus:ring-sky-500 focus:border-sky-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500 relative"
						placeholder="correo@dominio.com"
						type="email"
						name="email"
						id="member_email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<div className="text-sm text-left text-gray-500 dark:text-gray-300 p-1 max-w-[80ch]">
						Suscríbete y se el primero en enterarte de nuevo contenido y
						funcionalidades.
					</div>
				</div>
				<div className="w-full flex justify-end md:justify-start md:mt-2">
					<input
						type="submit"
						value="Suscribirme"
						className="p-4 text-sm font-medium text-center text-white dark:text-gray-50 rounded-2xl cursor-pointer bg-sky-700 hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all duration-300 ease-in border border-sky-100 dark:border-gray-600 mt-4 md:mt-0"
						name="member_submit"
						id="member_submit"
					/>
				</div>
			</div>
		</form>
	);
}
