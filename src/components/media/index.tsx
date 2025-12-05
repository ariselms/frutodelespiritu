import { PassageSelection } from "@/models/bibleTypes";

export function OrangeGradientRightToBottomLeft({
	passageSelection,
	mediaControllers,
	usage
}: {
	passageSelection: PassageSelection;
	mediaControllers: any;
	usage: string | null;
}) {

  usage !== "api" && usage === null;

	return (
		<div
			style={{
				overflow: "hidden",
				position: "relative",
				height: "100%",
				width: "100%",
				display: "flex",
				textAlign: "center",
				alignItems: "flex-start",
				justifyContent: "space-between",
				flexDirection: "column",
				flexWrap: "nowrap",
				backgroundColor: "white",
				padding: "16px 32px",
				backgroundImage:
					usage === "api"
						? `linear-gradient(${mediaControllers.selectedBackgroundImageValue})` // <--- Add this wrapper
						: "linear-gradient(to bottom left, #FED7AA, #FFEDD5, #FFF7ED)",
				backgroundRepeat: "no-repeat"
			}}>
			{usage === "main" && (
				<>
					<div
						style={{
							position: "absolute",
							right: 16,
							bottom: 16,
							display: "flex",
							alignItems: "stretch",
							flexDirection: "row-reverse"
						}}>
						<img
							src="https://frutodelespiritu.com/images/logo.png"
							alt="Bible study concept"
							style={{
								width: "50px",
								height: "50px"
							}}
						/>
						<div
							style={{
								display: "flex",
								fontSize: 24,
								fontStyle: "normal",
								color: "gray",
								marginTop: "auto",
								whiteSpace: "pre-wrap"
							}}>
							<b>frutodelespiritu.com</b>
						</div>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "flex-start",
							justifyContent: "flex-start",
							flexDirection: "column",
							fontStyle: "normal",
							color: "black",
							lineHeight: 1.5,
							whiteSpace: "pre-wrap"
						}}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-end"
							}}>
							<b
								style={{
									fontSize: 16,
									whiteSpace: "pre-wrap",
									color: "gray"
								}}>
								Reina Valera 1909
							</b>
							<b
								style={{
									fontSize: mediaControllers.verseInfoSize,
									whiteSpace: "pre-wrap",
									marginBottom: "8px"
								}}>
								{passageSelection.book ? passageSelection.book.name : "Juan"}{" "}
								{passageSelection.chapter ? passageSelection.chapter : 3}
								{":"}
								{passageSelection.verses && passageSelection.verses.length > 0
									? passageSelection.verses.length > 1
										? `${passageSelection.verses[0]}-${
												passageSelection.verses[
													passageSelection.verses.length - 1
												]
										  }`
										: passageSelection.verses[0]
									: "16"}
							</b>
						</div>
						<span
							style={{
								fontSize: mediaControllers.passageTextSize,
								whiteSpace: "pre-wrap",
								textAlign: "start",
								lineHeight: "1.5"
							}}>
							{passageSelection.passageText
								? passageSelection.passageText
								: "Porque de tal manera amó Dios al mundo para que todo aquel que crea no se pierda, mas tenga vida eterna."}
						</span>
					</div>
				</>
			)}
		</div>
	);
}

export function BlueGradientRightToBottomLeft({
	passageSelection,
	mediaControllers,
	usage
}: {
	passageSelection: PassageSelection;
	mediaControllers: any;
	usage: string | null;
}) {

  usage !== "api" && usage === null;

	return (
		<div
			style={{
				overflow: "hidden",
				position: "relative",
				height: "100%",
				width: "100%",
				display: "flex",
				textAlign: "center",
				alignItems: "flex-start",
				justifyContent: "space-between",
				flexDirection: "column",
				flexWrap: "nowrap",
				backgroundColor: "white",
				padding: "16px 32px",
				backgroundImage:
					usage === "api"
						? `linear-gradient(${mediaControllers.selectedBackgroundImageValue})` // <--- Add this wrapper
						: "linear-gradient(to bottom left, #BFDBFE, #DBEAFE, #EFF6FF)",
				backgroundRepeat: "no-repeat"
			}}>
			{usage === "main" && (
				<>
					{" "}
					<div
						style={{
							position: "absolute",
							right: 16,
							bottom: 16,
							display: "flex",
							alignItems: "stretch",
							flexDirection: "row-reverse"
						}}>
						<img
							src="https://frutodelespiritu.com/images/logo.png"
							alt="Bible study concept"
							style={{
								width: "50px",
								height: "50px"
							}}
						/>
						<div
							style={{
								display: "flex",
								fontSize: 24,
								fontStyle: "normal",
								color: "gray",
								marginTop: "auto",
								whiteSpace: "pre-wrap"
							}}>
							<b>frutodelespiritu.com</b>
						</div>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "flex-start",
							justifyContent: "flex-start",
							flexDirection: "column",
							fontStyle: "normal",
							color: "black",
							lineHeight: 1.5,
							whiteSpace: "pre-wrap"
						}}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-end"
							}}>
							<b
								style={{
									fontSize: 16,
									whiteSpace: "pre-wrap",
									color: "gray"
								}}>
								Reina Valera 1909
							</b>
							<b
								style={{
									fontSize: mediaControllers.verseInfoSize,
									whiteSpace: "pre-wrap",
									marginBottom: "8px"
								}}>
								{passageSelection.book ? passageSelection.book.name : "Juan"}{" "}
								{passageSelection.chapter ? passageSelection.chapter : 3}
								{":"}
								{passageSelection.verses && passageSelection.verses.length > 0
									? passageSelection.verses.length > 1
										? `${passageSelection.verses[0]}-${
												passageSelection.verses[
													passageSelection.verses.length - 1
												]
										  }`
										: passageSelection.verses[0]
									: "16"}
							</b>
						</div>
						<span
							style={{
								fontSize: mediaControllers.passageTextSize,
								whiteSpace: "pre-wrap",
								textAlign: "start",
								lineHeight: "1.5"
							}}>
							{passageSelection.passageText
								? passageSelection.passageText
								: "Porque de tal manera amó Dios al mundo para que todo aquel que crea no se pierda, mas tenga vida eterna."}
						</span>
					</div>
				</>
			)}
		</div>
	);
}

export function RedGradientRightToBottomLeft({
	passageSelection,
	mediaControllers,
	usage
}: {
	passageSelection: PassageSelection;
	mediaControllers: any;
	usage: string | null;
}) {

  usage !== "api" && usage === null;

	return (
		<div
			style={{
				overflow: "hidden",
				position: "relative",
				height: "100%",
				width: "100%",
				display: "flex",
				textAlign: "center",
				alignItems: "flex-start",
				justifyContent: "space-between",
				flexDirection: "column",
				flexWrap: "nowrap",
				backgroundColor: "white",
				padding: "16px 32px",
				backgroundImage:
					usage === "api"
						? `linear-gradient(${mediaControllers.selectedBackgroundImageValue})` // <--- Add this wrapper
						: "linear-gradient(to bottom left, #FECACA, #FEE2E2, #FEF2F2)",
				backgroundRepeat: "no-repeat"
			}}>
			{usage === "main" && (
				<>
					{" "}
					<div
						style={{
							position: "absolute",
							right: 16,
							bottom: 16,
							display: "flex",
							alignItems: "stretch",
							flexDirection: "row-reverse"
						}}>
						<img
							src="https://frutodelespiritu.com/images/logo.png"
							alt="Bible study concept"
							style={{
								width: "50px",
								height: "50px"
							}}
						/>
						<div
							style={{
								display: "flex",
								fontSize: 24,
								fontStyle: "normal",
								color: "gray",
								marginTop: "auto",
								whiteSpace: "pre-wrap"
							}}>
							<b>frutodelespiritu.com</b>
						</div>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "flex-start",
							justifyContent: "flex-start",
							flexDirection: "column",
							fontStyle: "normal",
							color: "black",
							lineHeight: 1.5,
							whiteSpace: "pre-wrap"
						}}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-end"
							}}>
							<b
								style={{
									fontSize: 16,
									whiteSpace: "pre-wrap",
									color: "gray"
								}}>
								Reina Valera 1909
							</b>
							<b
								style={{
									fontSize: mediaControllers.verseInfoSize,
									whiteSpace: "pre-wrap",
									marginBottom: "8px"
								}}>
								{passageSelection.book ? passageSelection.book.name : "Juan"}{" "}
								{passageSelection.chapter ? passageSelection.chapter : 3}
								{":"}
								{passageSelection.verses && passageSelection.verses.length > 0
									? passageSelection.verses.length > 1
										? `${passageSelection.verses[0]}-${
												passageSelection.verses[
													passageSelection.verses.length - 1
												]
										  }`
										: passageSelection.verses[0]
									: "16"}
							</b>
						</div>
						<span
							style={{
								fontSize: mediaControllers.passageTextSize,
								whiteSpace: "pre-wrap",
								textAlign: "start",
								lineHeight: "1.5"
							}}>
							{passageSelection.passageText
								? passageSelection.passageText
								: "Porque de tal manera amó Dios al mundo para que todo aquel que crea no se pierda, mas tenga vida eterna."}
						</span>
					</div>
				</>
			)}
		</div>
	);
}

export function PurpleGradientRightToBottomLeft({
	passageSelection,
	mediaControllers,
	usage
}: {
	passageSelection: PassageSelection;
	mediaControllers: any;
	usage: string | null;
}) {

  usage !== "api" && usage === null;

	return (
		<div
			style={{
				overflow: "hidden",
				position: "relative",
				height: "100%",
				width: "100%",
				display: "flex",
				textAlign: "center",
				alignItems: "flex-start",
				justifyContent: "space-between",
				flexDirection: "column",
				flexWrap: "nowrap",
				backgroundColor: "white",
				padding: "16px 32px",
				backgroundImage: usage === "api"
					? `linear-gradient(${mediaControllers.selectedBackgroundImageValue})` // <--- Add this wrapper
					: "linear-gradient(to bottom left, #E9D5FF, #F3E8FF, #FAF5FF)"
			}}>
			{usage === "main" && (
				<>
					{" "}
					<div
						style={{
							position: "absolute",
							right: 16,
							bottom: 16,
							display: "flex",
							alignItems: "stretch",
							flexDirection: "row-reverse"
						}}>
						<img
							src="https://frutodelespiritu.com/images/logo.png"
							alt="Bible study concept"
							style={{
								width: "50px",
								height: "50px"
							}}
						/>
						<div
							style={{
								display: "flex",
								fontSize: 24,
								fontStyle: "normal",
								color: "gray",
								marginTop: "auto",
								whiteSpace: "pre-wrap"
							}}>
							<b>frutodelespiritu.com</b>
						</div>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "flex-start",
							justifyContent: "flex-start",
							flexDirection: "column",
							fontStyle: "normal",
							color: "black",
							lineHeight: 1.5,
							whiteSpace: "pre-wrap"
						}}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-end"
							}}>
							<b
								style={{
									fontSize: 16,
									whiteSpace: "pre-wrap",
									color: "gray"
								}}>
								Reina Valera 1909
							</b>
							<b
								style={{
									fontSize: mediaControllers.verseInfoSize,
									whiteSpace: "pre-wrap",
									marginBottom: "8px"
								}}>
								{passageSelection.book ? passageSelection.book.name : "Juan"}{" "}
								{passageSelection.chapter ? passageSelection.chapter : 3}
								{":"}
								{passageSelection.verses && passageSelection.verses.length > 0
									? passageSelection.verses.length > 1
										? `${passageSelection.verses[0]}-${
												passageSelection.verses[
													passageSelection.verses.length - 1
												]
										  }`
										: passageSelection.verses[0]
									: "16"}
							</b>
						</div>
						<span
							style={{
								fontSize: mediaControllers.passageTextSize,
								whiteSpace: "pre-wrap",
								textAlign: "start",
								lineHeight: "1.5"
							}}>
							{passageSelection.passageText
								? passageSelection.passageText
								: "Porque de tal manera amó Dios al mundo para que todo aquel que crea no se pierda, mas tenga vida eterna."}
						</span>
					</div>
				</>
			)}
		</div>
	);
}

export function ApiExportBaseImage({
	passageSelection,
	mediaControllers,
	usage
}: {
	passageSelection: PassageSelection;
	mediaControllers: any;
	usage: string | null;
}) {

	return (
		<div
			style={{
				overflow: "hidden",
				position: "relative",
				height: "100%",
				width: "100%",
				display: "flex",
				textAlign: "center",
				alignItems: "flex-start",
				justifyContent: "space-between",
				flexDirection: "column",
				flexWrap: "nowrap",
				backgroundColor: "white",
				padding: "16px 32px",
				backgroundImage:
					usage === "main"
						? `linear-gradient(${mediaControllers.selectedBackgroundImageValue})` // <--- Add this wrapper
						: "linear-gradient(to bottom left, #FED7AA, #FFEDD5, #FFF7ED)",
				backgroundRepeat: "no-repeat"
			}}>
			{usage === "main" && (
				<div style={{display: "flex", position: "relative", height: "100%", width: "100%"}}>
					<div
						style={{
							position: "absolute",
							right: 16,
							bottom: 16,
							display: "flex",
							alignItems: "stretch",
							flexDirection: "row-reverse"
						}}>
						<img
							src="https://frutodelespiritu.com/images/logo.png"
							alt="Bible study concept"
							style={{
								width: "50px",
								height: "50px"
							}}
						/>
						<div
							style={{
								display: "flex",
								fontSize: 24,
								fontStyle: "normal",
								color: "gray",
								marginTop: "auto",
								whiteSpace: "pre-wrap"
							}}>
							<b>frutodelespiritu.com</b>
						</div>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "flex-start",
							justifyContent: "flex-start",
							flexDirection: "column",
							fontStyle: "normal",
							color: "black",
							lineHeight: 1.5,
							whiteSpace: "pre-wrap"
						}}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-end"
							}}>
							<b
								style={{
									fontSize: 16,
									whiteSpace: "pre-wrap",
									color: "gray"
								}}>
								Reina Valera 1909
							</b>
							<b
								style={{
									fontSize: mediaControllers.verseInfoSize,
									whiteSpace: "pre-wrap",
									marginBottom: "8px"
								}}>
								{passageSelection.book ? passageSelection.book.name : "Juan"}{" "}
								{passageSelection.chapter ? passageSelection.chapter : 3}
								{":"}
								{passageSelection.verses && passageSelection.verses.length > 0
									? passageSelection.verses.length > 1
										? `${passageSelection.verses[0]}-${
												passageSelection.verses[
													passageSelection.verses.length - 1
												]
										  }`
										: passageSelection.verses[0]
									: "16"}
							</b>
						</div>
						<span
							style={{
								fontSize: mediaControllers.passageTextSize,
								whiteSpace: "pre-wrap",
								textAlign: "start",
								lineHeight: "1.5"
							}}>
							{passageSelection.passageText
								? passageSelection.passageText
								: "Porque de tal manera amó Dios al mundo para que todo aquel que crea no se pierda, mas tenga vida eterna."}
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
