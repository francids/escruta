export default function HeroSection() {
  return (
    <section className="bg-white dark:bg-neutral-950 text-gray-800 dark:text-gray-200 lg:grid lg:h-screen lg:place-content-center">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Think,
            <strong className="text-blue-500 dark:text-blue-400"> ask, </strong>
            learn!
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 dark:text-gray-300 sm:text-lg/relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
            nisi.
          </p>
        </div>
      </div>
    </section>
  );
}
