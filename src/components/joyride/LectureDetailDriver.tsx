"use client";

import { useEffect } from "react";
import { driver } from "driver.js";
import { localStorageVariables } from "@/static/";
import { checkIfLocalStorageItemExists, setLocalStorageItem } from "@/helpers";
import "driver.js/dist/driver.css";

export function LectureDetailDriver() {

	useEffect(() => {

    // check local storage
    const isViewed = checkIfLocalStorageItemExists(localStorageVariables.joyRideLectures);

    console.log("isViewed", isViewed)

    if(isViewed !== null){
      return;
    }

		const drive = driver({
			showProgress: true,
			allowClose: false,
			allowKeyboardControl: false,
			overlayClickBehavior: "nextStep",

			// --- Spanish Translations Start ---
			nextBtnText: "Siguiente", // Next
			prevBtnText: "Anterior", // Previous
			doneBtnText: "Finalizar", // Done
			progressText: "Paso {{current}} de {{total}}", // "Step 1 of 2"
			// ----------------------------------

			steps: [
				{
					element: "#driver-lecture-1",
					popover: {
						title: "Categoría",
						description:
							"Oprime el enlace para ver más artículos de esta categoría"
					}
				},
				{
					element: "#driver-lecture-2",
					popover: {
						title: "Guarda tu lectura",
						description:
							"Oprime el botón para guardar esta lectura en tu lista de lecturas"
					}
				},
				{
					element: "#driver-lecture-3",
					popover: {
						title: "Lecturas adicionales",
						description:
							"Lista de artículos adicionales para continuar aprendiendo la Palabra"
					}
				}
			],

			onDestroyed: () => {
        // set local storage
				setLocalStorageItem(localStorageVariables.joyRideLectures, "true");
        // scroll to the top
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
			}
		});

    drive.drive();

	}, []);

  return null
}
