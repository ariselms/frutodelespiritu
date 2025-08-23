"use client";

import { useEffect } from "react";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import ReactAdminSuper from "@/components/admin/ReactAdminSuper";
import ReactAdminEditor from "@/components/admin/ReactAdminEditor";
import { MainLoader } from "@/components/Loaders";
import styles from "@/components/admin/react-admin-styles.module.css";

export default function AdminPage() {
	const { user } = useAuthContext();
	const router = useRouter();

	useEffect(() => {
		// This effect runs after render, whenever 'user' or 'router' changes.

		// Don't do anything until the user object has been loaded from the context.
		if (user === null) {
			return;
		}

		// Once we have a user, check their role and redirect if necessary.
		if (user.role !== "admin" && user.role !== "editor") {
			router.push("/perfil");
		}
	}, [user, router]); // Dependency array ensures this runs when 'user' is updated.

	// While waiting for the user object, show a loading state or nothing at all.
	// This prevents the flicker and ensures we don't render an admin panel prematurely.
	if (user === null) {
		return <MainLoader />; // Or return null;
	}

	// Once the effect has run and we've confirmed the user has the right role,
	// render the correct admin panel.
	if (user.role === "admin") {
		return <div className={styles.ReactAdminContainer}>ADMINININ<ReactAdminSuper /></div>;
	}

	if (user.role === "editor") {
		return <ReactAdminEditor />;
	}

	// This will be shown briefly for non-admin/editor roles before the redirect happens.
	// A loading indicator is often best here as well.
	return <div>Loading...</div>;
}
