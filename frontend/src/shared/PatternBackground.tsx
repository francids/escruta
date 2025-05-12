export default function PatternBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-white/25 dark:bg-black/25 -z-40"></div>
      <div
        className={`bg-[url(/LightPatternBackground.png)] dark:bg-[url(/DarkPatternBackground.png)] bg-cover bg-gray-100 dark:bg-gray-900 absolute inset-0 -z-50 ${className}`}
      ></div>
    </>
  );
}
