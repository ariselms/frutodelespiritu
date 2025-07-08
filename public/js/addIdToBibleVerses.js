// This script waits for the entire HTML document to be loaded and parsed
// before executing the code inside, ensuring all elements are available.
document.addEventListener("DOMContentLoaded", () => {
	// Select all elements that have the class 'v'.
	// querySelectorAll returns a NodeList, which is similar to an array.
	const elementsWithClassV = document.querySelectorAll(".v");

	// Iterate over each element found in the NodeList.
	elementsWithClassV.forEach((element) => {
		// Get the value of the 'data-sid' attribute for the current element.
		// dataset provides a convenient way to access data-* attributes.
		const dataSidValue = element.dataset.sid;

		// Check if data-sidValue exists to avoid setting null/undefined as an ID.
		if (dataSidValue) {
			// Set the 'id' attribute of the current element to the retrieved data-sid value.
			element.id = dataSidValue;
		} else {
			// Optional: Log a warning if an element with class 'v' doesn't have a data-sid.
			console.warn(
				'Element with class "v" found without a "data-sid" attribute:',
				element
			);
		}
	});

	// Optional: Log a confirmation message to the console.
	console.log('IDs have been successfully added to elements with class "v".');
	console.log(
		"You can inspect the elements in the browser developer tools to verify."
	);
});
