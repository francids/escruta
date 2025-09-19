import { Link } from "react-router";

interface NavItem {
  name: string;
  path: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Get started",
    items: [
      { name: "Welcome", path: "/docs" },
      { name: "Joke", path: "/docs/joke" },
    ],
  },
  {
    title: "Features",
    items: [
      { name: "Notebooks", path: "/docs/notebooks" },
      { name: "Notes", path: "/docs/notes" },
      { name: "Sources", path: "/docs/sources" },
    ],
  },
];

export default function NavSidePanel() {
  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-800/60 border-r border-gray-200 dark:border-gray-700 overflow-auto">
      <nav className="p-4">
        <ul className="space-y-6">
          {navSections.map((section) => (
            <li key={section.title}>
              <h3 className="px-3 py-2 text-sm font-bold text-gray-900 dark:text-gray-200">
                {section.title}
              </h3>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="block px-3 py-1 rounded-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 active:outline-none active:ring-2"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
