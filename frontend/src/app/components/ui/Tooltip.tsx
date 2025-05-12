export default function Tooltip({
  children,
  text,
  position = "top",
}: {
  children: React.ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
}) {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute ${positionClasses[position]} hidden group-hover:block whitespace-normal break-words rounded-xs bg-black dark:bg-white py-1.5 px-3 text-sm text-white dark:text-black`}
      >
        {text}
      </div>
    </div>
  );
}
