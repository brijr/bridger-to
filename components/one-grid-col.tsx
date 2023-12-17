const OneGridCol = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="group flex h-full flex-col items-start justify-between gap-6 px-6 py-3 md:py-6 md:hover:bg-orange-500 md:hover:text-black">
      {children}
    </div>
  );
};

export default OneGridCol;
