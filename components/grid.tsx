const Grid = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col flex-grow font-light w-full md:h-screen md:grid md:grid-cols-4">
      {children}
    </main>
  );
};

export default Grid;
