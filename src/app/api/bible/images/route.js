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
      passageText: passageText.replaceAll('.', '. ')
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
