"use client";
import { FetchEndpoints } from "@/static";
import { useState } from "react";
import { toast } from "react-hot-toast";

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

				toast.success(response.message, {
          duration: 5000,
        });
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
						className="block bg-blue-50 dark:bg-gray-700 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
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
				<div className="w-full flex justify-start md:mt-2">
					<input
						type="submit"
						value="Suscribirme"
						className="p-4 text-sm font-medium text-center text-white dark:text-gray-50 rounded-lg cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all duration-300 ease-in border border-blue-100 dark:border-gray-600 mt-4 md:mt-0"
						name="member_submit"
						id="member_submit"
					/>
				</div>
			</div>
		</form>
	);
}
