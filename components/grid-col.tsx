const GridCol = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col items-start justify-between gap-6 px-6 py-3 md:py-6 md:hover:bg-neutral-200 md:dark:hover:bg-neutral-800">
      {children}
    </div>
  );
};

export default GridCol;
