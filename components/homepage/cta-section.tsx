import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 text-center">
      <div className="container flex flex-col items-center">
        <div className="relative mb-6 flex size-20 items-center justify-center rounded-2xl bg-white shadow-lg dark:bg-gray-900">
          <span className="text-3xl font-bold">n.</span>
        </div>

        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Ready to get started?
        </h2>

        <p className="mb-8 max-w-md text-gray-600 dark:text-gray-300">
          Try Nulis for Free, and take your documents to the next level.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="rounded-full px-8">
            Download Nulis
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8">
            Open in Browser
          </Button>
        </div>
      </div>
    </section>
  );
}
