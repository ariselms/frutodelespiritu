"use client";
import { useMemo } from "react";
import { useAuthContext } from "@/context/authContext";
import customDataProvider from "@/helpers/react-admin";
import { DataProvider } from "@/static";

export const useDataProvider = () => {
	// 1. Get the user from your context, just like in a component
	const { user } = useAuthContext();

	// 2. Create the dataProvider using useMemo.
	// This is important for performance, so the object is not rebuilt on every render.
	// It will only be rebuilt if the 'user' object changes.
	const dataProvider = useMemo(() => {
		return {
			// Spread all the methods from your original dataProvider
			...customDataProvider,

			// Override the getList method
			getList: (resource: string, params: any) => {
				// Now you have direct access to the 'user' object here.
				// We apply the same logic as before.
				if (
					(resource === DataProvider.Lectures || DataProvider.Categories) &&
					user?.id
				) {
					const newFilter = {
						...params.filter,
						by_user_id: user.id
					};

					const newParams = { ...params, filter: newFilter };

					return customDataProvider.getList(resource, newParams);
				}

				// For all other cases, use the original getList method
				return customDataProvider.getList(resource, params);
			}
		};
	}, [user]); // The dependency array ensures this runs only when 'user' changes

	return dataProvider;
};

export const useFetchUserMemorizationLists = async (userId: string) => {
	try {
		const requestUserMemorizationLists = await fetch(
			`/api/user/${userId}/memorization?userId=${userId}`
		);
		const responseUserMemorizationLists =
			await requestUserMemorizationLists.json();

		if (!responseUserMemorizationLists.success) {
			throw new Error("Error fetching user memorization lists");
		}

		return responseUserMemorizationLists;
	} catch (error) {
		console.error("Error fetching user memorization lists:", error);
	}
};

export const useFetchUserNoteLists = async (userId: string) => {
  try {
    const requestUserNoteLists = await fetch(
      `/api/user/${userId}/note?userId=${userId}`
    );
    const responseUserNoteLists = await requestUserNoteLists.json();

    if (!responseUserNoteLists.success) {
      throw new Error("Error fetching user note lists");
    }

    return responseUserNoteLists;
  } catch (error) {
    console.error("Error fetching user note lists:", error);
  }
};
