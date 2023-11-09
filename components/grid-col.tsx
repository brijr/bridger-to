const GridCol = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full p-6 flex flex-col gap-6 items-start justify-between md:hover:bg-neutral-200 md:dark:hover:bg-neutral-800">
      {children}
    </div>
  );
};

export default GridCol;
