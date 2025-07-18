export default function ProfileSection({
  sectionName,
  sectionEmail,
  sectionDescription
}: {
  sectionName: string;
  sectionEmail?: string;
  sectionDescription: string;
}){
 return (
		<section className="py-16 text-black dark:text-white">
			<div className="mb-4">
				<h1 className="text-2xl">{sectionName}</h1>
        {sectionEmail && (
				  <p className="text-sm font-bold">{sectionEmail}</p>
        )}
			</div>
			<p className="max-w-[80ch]">
				{sectionDescription}
			</p>
		</section>
 );
}