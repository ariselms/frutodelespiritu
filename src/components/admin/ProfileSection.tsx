import { UserProfileForm } from "@/components/forms/UserProfileForm";
import Image from "next/image";

export default function ProfileSection({
  imageUrl,
	sectionName,
	sectionEmail,
	sectionDescription,
	isProfile = false
}: {
  imageUrl?: string;
	sectionName: string;
	sectionEmail?: string;
	sectionDescription: string;
	isProfile?: boolean
}) {
	return (
		<section className="py-16 px-4 xl:px-0">
			<div className="container mx-auto flex flex-col items-start lg:flex-row">
				<div className="w-full md:w-6/12 p-2">
					{isProfile && (
						<div className="flex flex-col justify-between rounded-2xl p-4 bg-orange-50 dark:bg-gray-700 border border-orange-300 dark:border-gray-600 w-fit-content mt-8 lg:mt-0">
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