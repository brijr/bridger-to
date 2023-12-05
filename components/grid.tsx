const Grid = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col flex-grow font-light w-full md:h-screen md:grid lg:grid-cols-3">
      {children}
    </main>
  );
};

export default Grid;
