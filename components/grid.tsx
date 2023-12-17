const Grid = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex w-full flex-grow flex-col font-light md:grid md:h-screen lg:grid-cols-3">
      {children}
    </main>
  );
};

export default Grid;
