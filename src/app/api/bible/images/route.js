import { ImageResponse } from "next/og";
import { ApiExportBaseImage } from "@/components/media";

export async function GET(request) {
	try {
    // get the query params
    const { searchParams } = new URL(request.url);

    const translation = searchParams.get('translation');
    const book = searchParams.get('book');
    const chapter = searchParams.get('chapter');
    const verseFrom = searchParams.get('verseFrom');
    const verseTo = searchParams.get('verseTo');
    const passageText = searchParams.get('passageText');
    const selectedBackgroundImageValue = searchParams.get(
			"selectedBackgroundImageValue"
		);
    const verseInfoSize = searchParams.get("verseInfoSize");
    const passageTextSize = searchParams.get("passageTextSize");
    const usage = searchParams.get("usage");

    const passageSelection = {
      translation: translation,
      book: {name: book},
      chapter: chapter,
      verseFrom: verseFrom,
      verseTo: verseTo,
      passageText: passageText,
    }

    const mediaControllers = {
			selectedBackgroundImageValue: selectedBackgroundImageValue,
			verseInfoSize: verseInfoSize,
			passageTextSize: passageTextSize
		};

		// 3. Return the ImageResponse
		return new ImageResponse(
			(
        <ApiExportBaseImage
          passageSelection={passageSelection}
          mediaControllers={mediaControllers}
          usage={usage}
        />
				// <div
				// 	style={{
				// 		height: "100%",
				// 		width: "100%",
				// 		display: "flex",
				// 		textAlign: "center",
				// 		alignItems: "flex-start",
				// 		justifyContent: "space-between",
				// 		flexDirection: "column",
				// 		flexWrap: "nowrap",
				// 		backgroundColor: "white",
				// 		padding: 16,
				// 		backgroundImage:
				// 			"linear-gradient(to bottom left, #FED7AA, #FFEDD5, #FFF7ED)",
				// 		backgroundRepeat: "no-repeat"
				// 	}}>
				// 	<div
				// 		style={{
				// 			position: "absolute",
				// 			right: 16,
				// 			bottom: 16,
				// 			display: "flex",
				// 			alignItems: "stretch",
				// 			flexDirection: "row-reverse"
				// 		}}>
				// 		<img
				// 			src="https://frutodelespiritu.com/images/logo.png"
				// 			alt="Bible study concept"
				// 			style={{
				// 				width: "50px",
				// 				height: "50px"
				// 			}}
				// 		/>
				// 		<div
				// 			style={{
				// 				display: "flex",
				// 				fontSize: 24,
				// 				fontStyle: "normal",
				// 				color: "gray",
				// 				marginTop: "auto",
				// 				whiteSpace: "pre-wrap"
				// 			}}>
				// 			<b>frutodelespiritu.com</b>
				// 		</div>
				// 	</div>
				// 	<div
				// 		style={{
				// 			display: "flex",
				// 			alignItems: "flex-start",
				// 			justifyContent: "flex-start",
				// 			flexDirection: "column",
				// 			fontStyle: "normal",
				// 			color: "black",
				// 			lineHeight: 1.8,
				// 			whiteSpace: "pre-wrap"
				// 		}}>
				// 		<div
				// 			style={{
				// 				display: "flex",
				// 				flexDirection: "column",
				// 				alignItems: "flex-end"
				// 			}}>
				// 			<b
				// 				style={{
				// 					fontSize: 16,
				// 					whiteSpace: "pre-wrap",
				// 					color: "gray"
				// 				}}>
				// 				Reina Valera 1909
				// 			</b>
				// 			<b
				// 				style={{
				// 					fontSize: 50,
				// 					whiteSpace: "pre-wrap",
				// 					marginTop: "-20",
				// 					marginBottom: "20px"
				// 				}}>
				// 				Juan 3:16
				// 			</b>
				// 		</div>
				// 		<span
				// 			style={{
				// 				fontSize: 32,
				// 				whiteSpace: "pre-wrap",
				// 				textAlign: "start",
				// 				lineHeight: "1.5"
				// 			}}>
				// 			Porque de tal manera amó Dios al mundo para que todo aquel que
				// 			crea no se pierda, mas tenga vida eterna.
				// 		</span>
				// 	</div>
				// </div>
			),

			// Image options
			{
				width: 800,
				height: 450,
				quality: 100
			}
		);
	} catch (e) {
		return new Response(`Failed to generate the image`, {
			status: 500
		});
	}
}
