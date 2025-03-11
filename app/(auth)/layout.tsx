import SocialAuthForm from "@/components/forms/SocialAuthForm";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-md">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
          <div className="p-8">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold">Get Started with Noteflow!</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Create your account to start taking notes or Login to your
                account
              </p>
            </div>
            {children}
            <SocialAuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}
