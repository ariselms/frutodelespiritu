"use client";

// Make sure to import these from React
import React, { useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Player } from "@lordicon/react";

// Define the shape of the methods we will expose
export type LordIconClickHandle = {
  triggerAnimation: () => void;
};

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

	return (
		// 3. Attach the event handlers to a wrapper div.
		<div
			className="cursor-pointer flex items-center justify-center"
			onMouseEnter={handleMouseEnter}>
			<div className="mr-0.3">
				<Player ref={playerRef} icon={ICON_SRC} size={size} state={state} />
			</div>
			<span className="text-xs sm:text-sm md:text-base  whitespace-nowrap">
				{text}
			</span>
		</div>
	);
}

// Wrap the component in forwardRef
export const LordIconClickRedirect = forwardRef<LordIconClickHandle,
  {
    size?: number;
    ICON_SRC: any;
    state: string;
    text?: string;
    route?: string;
  }
>(({ size = 96, ICON_SRC, state, text, route }, ref) => {
  const { push } = useRouter();
  const playerRef = useRef<Player>(null);

  // Expose the playFromBeginning function via a ref
  useImperativeHandle(ref, () => ({
    triggerAnimation() {
      playerRef.current?.playFromBeginning();
    },
  }));

  return (
		// We no longer need the onClick handler here
		<div className="flex flex-col items-center justify-center">
			<Player
				ref={playerRef}
				icon={ICON_SRC}
				size={size}
				state={state}
				onComplete={() => {
					if (route) {
						push(route);
					}
				}}
			/>
			<span>{text}</span>
		</div>
	);
});

export function LordIconRevealOnLoad({
	size = 96,
	ICON_SRC,
	state,
	text
}: {
	size: number;
	ICON_SRC: any;
	state: string;
	text?: string;
}) {
	// 1. Create a ref to get access to the Player component instance.
	const playerRef = useRef<Player>(null);

	// 2. Define the event for when the page load to play the animation
  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

	return (
		// 3. Attach the event handlers to a wrapper div.
		<div
			className="cursor-pointer flex flex-row items-center justify-between">
			<div className="mr-0.3">
				<Player ref={playerRef} icon={ICON_SRC} size={size} state={state} />
			</div>
			<span className="text-sm md:text-base">{text}</span>
		</div>
	);
}
