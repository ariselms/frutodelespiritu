import { UserProfileForm } from "@/components/forms/UserProfileForm";
export default function ProfileSection({
	sectionName,
	sectionDescription,
	isProfile = false
}: {
	sectionName: string;
	sectionDescription: string;
	isProfile?: boolean;
}) {
	return (
		<section className="container mx-auto flex flex-col items-start lg:flex-row py-8 px-4 md:-px-2">
			<div className="w-full md:w-8/12">
				{isProfile && (
					<div className="flex flex-col justify-between rounded-2xl p-4 bg-sky-50 dark:bg-gray-900/50 border border-sky-100 dark:border-gray-600 w-fit-content mt-8 lg:mt-0">
						<h5 className="text-2xl font-bold tracking-tight text-black dark:text-white mb-2">
							Edita tu perfil
						</h5>
						<p className="font-normal text-gray-700 dark:text-gray-200 mb-4">
							Maneja tu información personal y de envio.
						</p>
						<UserProfileForm />
					</div>
				)}
				{!isProfile && (
					<>
						<h1 className="text-2xl font-extrabold tracking-tight leading-none md:text-3xl text-black dark:text-white">
							{sectionName}
						</h1>
						<p className="max-w-[80ch] text-gray-700 dark:text-gray-200">
							{sectionDescription}
						</p>
					</>
				)}
			</div>
		</section>
	);
}
