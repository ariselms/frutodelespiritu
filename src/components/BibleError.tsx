import { Alert } from "flowbite-react";
import { HiEye, HiInformationCircle } from "react-icons/hi";

export default function BibleError({message}: {message: string}) {

    return (
        <main>
            <div className="m-4 max-w-[80ch] mx-auto">
                <Alert color="warning">
                    <span className="font-medium">A todo los usuarios:</span>
                    {message}
                </Alert>
            </div>
        </main>
    )
}