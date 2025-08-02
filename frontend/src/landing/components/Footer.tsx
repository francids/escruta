import Logo from "../../shared/Logo";

export default function Footer() {
  return (
    <footer className="py-8 md:py-12 px-6 md:px-24 border-t border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800">
      <div className="container mx-auto flex flex-col items-center">
        <Logo className="w-auto h-4 fill-gray-400 dark:fill-gray-500" />
        <div className="mt-10 text-center text-gray-400 dark:text-gray-500 text-sm">
          © {new Date().getFullYear()} Escruta. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
