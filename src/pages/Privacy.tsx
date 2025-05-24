import { Separator } from '@/components/ui/separator';

export default function Privacy() {
    return (
        <div className="mt-12 justify-items-center min-h-full p-4 pb-8 animate-blur-in">
            <main className="w-full max-w-lg h-fit">
                <h2 className="font-medium text-xl flex-grow p-0 mt-1">
                    Privacy Policy for Poem Base
                </h2>
                <Separator className="flex w-full my-4" />
                <div className="flex flex-col gap-2 text-sm font-regular">
                    <p className="text-xs font-semibold mb-4 text-muted-foreground">
                        Effective Date: May 25, 2025
                    </p>

                    <h2 className="text-md font-semibold">1. Information We Collect</h2>

                    <p>We collect and store the following information:</p>
                    <ul className="flex flex-col gap-2">
                        <li className="list-disc list-outside ml-8">
                            Email address: Collected when you sign up or log in using Firebase
                            Authentication.
                        </li>
                        <li className="list-disc list-outside ml-8">
                            Saved poems: The poems you choose to save while using the site.
                        </li>
                    </ul>
                    <p>We do not collect any additional personal information.</p>

                    <h2 className="text-md font-bold mt-4">2. How We Use Your Information</h2>
                    <p>We do not sell or share your personal data with third parties.</p>

                    <ul className="flex flex-col gap-2">
                        <li className="list-disc list-outside ml-8">
                            Your email address is used solely for authentication purposes — to allow
                            you to log in to Poem Base and access your saved content.
                        </li>
                        <li className="list-disc list-outside ml-8">
                            Your saved poems are stored to provide a personalized experience and
                            allow you to revisit your favorite works.
                        </li>
                    </ul>

                    <h2 className="text-md font-bold mt-4">3. Third-Party Services</h2>
                    <p>We use the following third-party services:</p>
                    <ul className="flex flex-col gap-2">
                        <li className="list-disc list-outside ml-8">
                            Firebase Authentication: For secure login and user account management.
                            Learn more at{' '}
                            <a
                                href="https://firebase.google.com/support/privacy"
                                className=" underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Firebase Privacy and Security
                            </a>
                            .
                        </li>
                        <li className="list-disc list-outside ml-8">
                            Cloud Firestore: Used to store each user's saved poems and password
                            length. Data is stored securely and is only accessible to the
                            authenticated user. Learn more at{' '}
                            <a
                                href="https://firebase.google.com/support/privacy"
                                className=" underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Firebase Privacy and Security
                            </a>
                            .
                        </li>
                        <li className="list-disc list-outside ml-8">
                            <a href="https://poetrydb.org/" className="underline">
                                PoetryDB API
                            </a>
                            : To provide access to poems. This data is provided under the{' '}
                            <a
                                href="https://github.com/thundercomb/poetrydb/blob/master/LICENSE.txt"
                                className="underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GNU General Public License v2.0
                            </a>
                            .
                        </li>
                        <li className="list-disc list-outside ml-8">
                            Vercel: Our hosting provider. Vercel may collect anonymized usage data
                            and logs for performance and error tracking. See{' '}
                            <a
                                href="https://vercel.com/legal/privacy-policy"
                                className="underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Vercel Privacy Policy
                            </a>
                            .
                        </li>
                    </ul>

                    <h2 className="text-md font-bold mt-4">4. Data Retention and Deletion</h2>
                    <p>
                        You can delete your account and all associated data (including your saved
                        poems and email) at any time by clicking the “Delete Account” button on your
                        account page. This action is permanent and cannot be undone.
                    </p>

                    <h2 className="text-md font-bold mt-4">5. Your Rights</h2>
                    <p>
                        Depending on your location, you may have rights under applicable privacy
                        laws to:
                    </p>
                    <ul className="flex flex-col gap-2">
                        <li className="list-disc list-outside ml-8">
                            Access the data we hold about you
                        </li>
                        <li className="list-disc list-outside ml-8">Correct any inaccurate data</li>
                        <li className="list-disc list-outside ml-8">
                            Request deletion of your personal data
                        </li>
                    </ul>
                    <p>
                        To exercise these rights or ask any questions, please contact us at
                        figmargaux@gmail.com. You are able to exercise these immediately rights at
                        any time through your account settings.
                    </p>

                    <h2 className="text-md font-bold mt-4">6. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. When we do, we’ll
                        update the “Effective Date” at the top. Continued use of the site after
                        changes are made constitutes your agreement to the new terms.
                    </p>

                    <h2 className="text-md font-bold mt-4">7. Contact Us</h2>
                    <p>
                        If you have any questions about this policy or your data, please contact us
                        at: figmargaux@gmail.com
                    </p>
                </div>
            </main>
        </div>
    );
}
