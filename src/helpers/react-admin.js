// src/customDataProvider.js

import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";
import { serverBaseUrl } from "@/static/index";
import { useContext } from "react";

/**
 * Custom HTTP client for React Admin.
 * This function can be extended to add custom headers (e.g., Authorization),
 * handle specific error responses, or modify requests before they are sent.
 *
 * @param {string} url The URL for the request.
 * @param {Object} options The options for the fetch request.
 * @returns {Promise<Object>} A promise that resolves with the JSON response.
 */
const httpClient = (url, options = {}) => {
	// Ensure headers exist
	if (!options.headers) {
		options.headers = new Headers({ Accept: "application/json" });
	}

	return fetchUtils.fetchJson(url, options);
};

// Initialize the base data provider with your API base URL and custom HTTP client
const baseDataProvider = simpleRestProvider(
	`${serverBaseUrl}/api/admin`,
	httpClient
);

/**
 * Custom Data Provider for React Admin.
 * This provider wraps the simpleRestProvider to handle API responses
 * where the actual data is nested under a 'data' property (e.g., { data: { ...actualData } }).
 * It transforms the responses to the format expected by React Admin.
 */

const customDataProvider = {
	// Spread all methods from the base data provider
	...baseDataProvider,

	/**
	 * Overrides the getList method to transform the response for list queries.
	 * Assumes the API returns a structure like: { data: { data: [...records], total: X } }
	 * React Admin expects: { data: [...records], total: X }
	 */
	getList: (resource, params) => {
		return baseDataProvider.getList(resource, params).then((response) => {
			// The response.data from simpleRestProvider might contain the nested object
			// We expect it to be like: { data: [...records], total: X }
			const apiResponseData = response.data;

			if (
				apiResponseData &&
				typeof apiResponseData.data !== "undefined" &&
				typeof apiResponseData.total !== "undefined"
			) {
				return {
					data: apiResponseData.data, // Extract the array of records
					total: apiResponseData.total // Extract the total count for pagination
				};
			}
			// If the structure is not as expected, log an error and return a fallback
			console.error(
				`Unexpected response structure for getList on resource '${resource}':`,
				response
			);
			return {
				data: (apiResponseData && apiResponseData.data) || [], // Fallback to original data or empty array
				total: (apiResponseData && apiResponseData.total) || 0 // Fallback to original total or 0
			};
		});
	},

	getMany: (resource, params) => {
		return baseDataProvider.getMany(resource, params).then((response) => {
			const { data } = response.data; // The API returns { data: [...] }
			if (data) {
				return { data };
			}
			throw new Error("Invalid response from getMany");
		});
	},

	/**
	 * Overrides the getOne method to transform the response for single record queries.
	 * Assumes the API returns a structure like: { data: { data: { ...record } } }
	 * React Admin expects: { data: { ...record } }
	 */
	getOne: (resource, params) => {
		return baseDataProvider.getOne(resource, params).then((response) => {
			const apiResponseData = response.data;

			if (apiResponseData && typeof apiResponseData !== "undefined") {
				return {
					data: apiResponseData.data // Send the single lecture object
				};
			}
			console.error(
				`Unexpected response structure for getOne on resource '${resource}':`,
				response
			);
			return response; // Return original response if structure is unexpected
		});
	},

	/**
	 * Overrides the create method to transform the response after creating a record.
	 * Assumes the API returns a structure like: { data: { data: { ...newRecord } } }
	 * React Admin expects: { data: { ...newRecord } }
	 */
	create: (resource, params) => {
		// This part handles the file upload.
		if (
			params.data.image_url &&
			params.data.image_url.rawFile instanceof File
		) {
			const formData = new FormData();
			const imageFile = params.data.image_url.rawFile;
			formData.append("image_url", imageFile);

			for (const key in params.data) {
				if (key !== "image_url") {
					formData.append(key, params.data[key]);
				}
			}

			return httpClient(`${serverBaseUrl}/api/${resource}`, {
				method: "POST",
				body: formData
			}).then(({ json }) => {
				// We check if the response has the nested 'data' object and an 'id'.
				if (json && json.data && json.data.id) {
					// React Admin expects the final object to be { data: THE_RECORD }
					// We are extracting json.data which is the record object.
					return { data: json.data };
				}

				// If we get here, the response was not what we expected.
				console.error(
					"The API response was missing the 'data' property or the 'id' within it.",
					json
				);
				throw new Error("Invalid response from API after create.");
			});
		}

		// This is the fallback for forms that DON'T have a file upload.
		// We still need to unwrap the response here too.
		// console.log("Using fallback create (no file upload)");

		return baseDataProvider.create(resource, params).then((response) => {
			// console.log("API response in fallback:", response);

			// So we need to look for response.data and then use record.data as the final object
			const record = response.data?.data;

			if (record && record.id) {
				return { data: record };
			}

			console.error(
				"The API response in fallback was missing the 'data' property or the 'id' within it.",
				response
			);

			throw new Error("Invalid response from API after create.");
		});
	},

	/**
	 * Overrides the update method to transform the response after updating a record.
	 * Assumes the API returns a structure like: { data: { data: { ...updatedRecord } } }
	 * React Admin expects: { data: { ...updatedRecord } }
	 */
	update: (resource, params) => {
		return baseDataProvider.update(resource, params).then((response) => {
			const apiResponseData = response.data;

			if (apiResponseData && typeof apiResponseData.data !== "undefined") {
				return {
					data: apiResponseData.data
				};
			}
			console.error(
				`Unexpected response structure for update on resource '${resource}':`,
				response
			);
			return response;
		});
	},

	/**
	 * Overrides the delete method to transform the response after deleting a record.
	 * Assumes the API returns a structure like: { data: { data: { id: deletedId } } }
	 * React Admin expects: { data: { id: deletedId } }
	 */
	delete: (resource, params) => {
		return baseDataProvider.delete(resource, params).then((response) => {
			const apiResponseData = response.data;

			if (apiResponseData && typeof apiResponseData.data !== "undefined") {
				return {
					data: apiResponseData.data // This should be the deleted record, or at least { id: deletedId }
				};
			}
			console.error(
				`Unexpected response structure for delete on resource '${resource}':`,
				response
			);
			return response;
		});
	}

	// You might also need to override these if your API nests their responses similarly:
	// getMany: (resource, params) => { /* ... transformation logic ... */ },
	// getManyReference: (resource, params) => { /* ... transformation logic ... */ },
	// updateMany: (resource, params) => { /* ... transformation logic ... */ },
	// deleteMany: (resource, params) => { /* ... transformation logic ... */ },
};

export default customDataProvider;
