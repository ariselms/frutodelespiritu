"use client";
import { useEffect, useState } from "react";
import {
	Button,
	Checkbox,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
	TextInput
} from "flowbite-react";
import { BibleCrudActions } from "@/static";

export default function AddNoteOrMemorization({
	bibleId,
	passageId,
	openModal,
	setOpenModal,
	action
}: {
	bibleId: string;
	passageId: string[];
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	action: string | null;
}) {
	const [bibleIdFinal, setBibleIdFinal] = useState<string>(bibleId);
	const [passageIdFinal, setPassageIdFinal] = useState<string[]>(
		Array.from(passageId)
	);

	function onCloseModal() {
		setOpenModal(false);
	}

  const onFormSubmission = () => {
    try {
      if(action === BibleCrudActions.note) {
				console.log("TODO: Create endpoints for bible notes.");
        // bible_note //
        // id int
        // title string
				// passage_id string
				// bible_id string
				// passage_text string
				// passage_note text
				// by_user_id reference int
				// created_at timestamp now
				// updated_at timestamp now
			}

      if(action === BibleCrudActions.memorization) {
				console.log("TODO: Create endpoints for memorization lists.");
				// memorization_list //
        // id int
        // name string
        // by_user_id reference int
        // created_at timestamp now
        // updated_at timestamp now

				// many to many memorization_list and users //
        // id int
				// memorization_list_id reference int
				// passage_id string
				// bible_id string
				// passage_text string
				// by_user_id reference int
				// created_at timestamp now
				// updated_at timestamp now
			}
    } catch (error) {

      console.error(error);

    }
  }

	return (
		<form>
			<Modal show={openModal} size="lg" onClose={onCloseModal} popup>
				<ModalHeader />
				<ModalBody>
					<div className="space-y-6">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							{action === BibleCrudActions.note
                ? "Add note to bible passage"
                : "Add memorization to bible passage"
              }
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="email">Your email</Label>
							</div>
							<TextInput
								id="email"
								placeholder="name@company.com"
								// value={email}
								// onChange={(event) => setEmail(event.target.value)}
								required
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="password">Your password</Label>
							</div>
							<TextInput id="password" type="password" required />
						</div>
						<div className="flex justify-between">
							<div className="flex items-center gap-2">
								<Checkbox id="remember" />
								<Label htmlFor="remember">Remember me</Label>
							</div>
							<a
								href="#"
								className="text-sm text-primary-700 hover:underline dark:text-primary-500">
								Lost Password?
							</a>
						</div>
						<div className="w-full">
							<Button>Log in to your account</Button>
						</div>
						<div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
							Not registered?&nbsp;
							<a
								href="#"
								className="text-primary-700 hover:underline dark:text-primary-500">
								Create account
							</a>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</form>
	);
}
