"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// It's best practice to register GSAP plugins once in your app's entry point,
// but for a self-contained component, you can do it here.
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FadeInMoveUp({ children }: { children: React.ReactNode }) {

	const container = useRef(null);

	useGSAP(
		() => {
			// A single animation targets all elements with the class.
			// GSAP handles the staggering internally.
			// Staggering is when you want to animate multiple elements at the same time.
			gsap.from(".fade-in-move-up", {
				opacity: 0,
				y: 16,
				duration: .5,
				ease: "power3.out",
				stagger: 0.15, // Now stagger works correctly!
				// scrollTrigger: {
				// 	// Trigger the entire sequence when the parent container is visible.
				// 	// You can also use a class that elements have in common to trigger the animation.
				// 	trigger: ".",
				// 	toggleActions: "play none none none",
				// 	once: true
				// }
			});
		},
		// Scope is great for cleanup, it will remove the animation when the component unmounts
		{ scope: container }
	);

	return (
		<div ref={container}>
			{ children }
		</div>
	);
}

export function ScrollTriggerPinSection({ children }: { children: React.ReactNode }) {
  const container = useRef(null);

  // useGsap to setup an animation with ScrollTrigger to pin a section that has the class of home-sect
  useGSAP(
    () => {
      let sections = document.querySelectorAll(".page-section");
      sections.forEach((section, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: false,
            scrub: true,
            start: () => "top top",
            end: () => "+=100%",
          }
        });
        tl.addLabel("initial");
        tl.to(section.querySelectorAll(".page-section"), {
          ease: "none",
          x: 0,
          stagger: 0.2
        });
      });
    },
    // Scope is great for cleanup, it will remove the animation when the component unmounts
    { scope: container }
  )
  return (
    <div ref={container}>
      { children }
    </div>
  );
}
