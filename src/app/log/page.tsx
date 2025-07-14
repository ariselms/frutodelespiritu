"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import { useAuthContext } from "@/context/authContext";
export default function LogPage(){
  const router = useRouter();
  const {user} = useAuthContext();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push("/admin");
    }
  }, [user, router]);

  const handleEmailSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {
      setProcessing(true);

			const request = await fetch("/api/log", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email })
			});

			const response = await request.json();

			if (response.success) {

				setCodeSent(true);

			} else {

        setError(
					response.message || "An error occurred while submitting the code."
				);

			}
		} catch (error) {

      console.error("Error submitting email:", error);
      setError("An error occurred while submitting your email. Please try again.");

    } finally {
      setProcessing(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {

		e.preventDefault();

		try {
      setProcessing(true);

			if (!code || !email) {
				throw new Error("Email and code are required");
			}

			if (code.length !== 6) {
				const errorMessage = "El código debe tener 6 digitos";
				throw new Error(errorMessage);
			}

			const request = await fetch("/api/auth", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email, code })
			});

			const response = await request.json();

			if (response.success) {
				// toast.success(response.message);
				router.push("/admin");

			} else {

        console.error(response.message);

			}
		} catch (error) {

      console.error(error);

      const errorMessage =
				error instanceof Error ? error.message : "An error occurred";

		} finally {

      setProcessing(false);

    }
	};

  return (
		<main className="bg-white dark:bg-gray-800">
			{!codeSent && (
				<form onSubmit={handleEmailSubmit} className="max-w-lg mx-auto py-32">
					<h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
						Iniciar Sesión
					</h1>
					<p className="block mb-12 text-base text-center text-gray-900 dark:text-white">
						Ingresa tu correo electr&oacute;nico y recibir&aacute;s un
						c&oacute;digo para ingresar.
					</p>
					<div className="mb-8">
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Tu correo electrónico
						</label>
						<input
							type="email"
							id="email"
							className="block w-full p-4 ps-10 text-sm text-gray-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
							placeholder="e.g. usuario@correo.com"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto p-4 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 cursor-pointer">
						Enviar Código
					</button>
				</form>
			)}
			{codeSent && (
				<form onSubmit={handleCodeSubmit} className="max-w-lg mx-auto py-32">
					<h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
						Ingresa tu Código
					</h1>
					<p className="block mb-12 text-base text-center text-gray-900 dark:text-white">
						Verifica tu correo electr&oacute;nico e ingresa c&oacute;digo que enviamos. Verifica tu carpeta de spam si no lo ves en tu bandeja de entrada.
					</p>
					<div className="mb-8">
						<label
							htmlFor="code"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Código de acceso
						</label>
						<input
							type="text"
							id="code"
							className="block w-full p-4 ps-10 text-sm text-gray-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-orange-500 dark:focus-visible:outline-gray-500"
							placeholder="e.g. 197382"
							required
							value={code}
              maxLength={6}
							onChange={(e) => setCode(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 cursor-pointer">
						Validar Código
					</button>
				</form>
			)}
		</main>
	);
}