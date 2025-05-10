export default function Tooltip({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-normal break-words rounded-xs bg-black dark:bg-white py-1.5 px-3 text-sm text-white dark:text-black">
        {text}
      </div>
    </div>
  );
}
