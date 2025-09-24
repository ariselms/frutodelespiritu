"use client";

import { useRef } from "react";
import { Player } from "@lordicon/react";
// Assuming 'lock.json' is in a folder accessible by your component
import ICON_SRC from "@/lotties/bible-open.json";

export function LordIconHover({
  size = 96,
  ICON_SRC,
  state,
  text
}: {
  size: number;
  ICON_SRC: any,
  state: string,
  text?: string
}) {
	// 1. Create a ref to get access to the Player component instance.
	const playerRef = useRef<Player>(null);

	// 2. Define the event handler for when the mouse enters the icon's area.
	// This will trigger the animation to play from the beginning.
	const handleMouseEnter = () => {
		playerRef.current?.playFromBeginning();
	};

	// 3. (Optional but recommended) Define a handler to reset the icon when the mouse leaves.
	// This makes the icon static again, ready for the next hover.
	const handleMouseLeave = () => {
		playerRef.current?.goToFirstFrame();
	};

  // 4. (Optional but recommended) Define an onClick handler to trigger the animation.
	// const handleClick = () => {
	// 	playerRef?.current?.playFromBeginning();
	// };

	return (
		// 4. Attach the event handlers to a wrapper div.
		<div
      className="cursor-pointer flex flex-col items-center justify-center"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			// onClick={handleClick}
      >
			<Player
				// 5. Assign the ref to the Player component.
				ref={playerRef}
				icon={ICON_SRC}
				size={size}
				state={state}
			/>
      {text}
		</div>
	);
}
