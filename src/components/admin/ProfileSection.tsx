import { UserProfileForm } from "@/components/forms/UserProfileForm";

export default function ProfileSection({
	sectionName,
	sectionEmail,
	sectionDescription,
	isProfile = false
}: {
	sectionName: string;
	sectionEmail?: string;
	sectionDescription: string;
	isProfile?: boolean
}) {
	return (
		<section className="py-16 px-4 xl:px-0 bg-white dark:bg-gray-950 text-black dark:text-white border-b border-orange-300">
			<div className="container mx-auto flex items-start flex-wrap">
				<div>
					<div className="mb-4">
						<h1 className="text-2xl">{sectionName}</h1>
						{sectionEmail && (
							<p className="text-sm font-bold">{sectionEmail}</p>
						)}
					</div>
					<p className="max-w-[80ch]">
						{sectionDescription}
					</p>
				</div>
				<div>
					{isProfile && (
						<div
							className="flex flex-col justify-between rounded-2xl p-4 bg-orange-50 dark:bg-gray-700 border border-orange-300 dark:border-gray-600 w-fit-content mt-8 xl:mt-0">
							<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
								Edita tu perfil
							</h5>
							<p className="font-normal text-gray-700 dark:text-gray-200 mb-4">
								Maneja tu información personal y de envio.
							</p>
							<UserProfileForm />
						</div>
					)}
				</div>
			</div>
		</section>
	);
}