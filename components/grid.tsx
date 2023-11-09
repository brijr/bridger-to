const Grid = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col gap-4 w-full h-full md:grid md:grid-cols-4">
      {children}
    </main>
  );
};

export default Grid;
