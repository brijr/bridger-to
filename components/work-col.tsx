import bt from "@/bt.config";

const WorkCol = () => {
  return (
    <>
      <div></div>
      <div className="w-full">
        <h3 className="mb-4">Software</h3>
        {bt.projects.map((project) => (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between items-baseline w-full space-y-2"
            key={project.title}
          >
            <p className="text-sm hover:opacity-70 hover:ml-1 transition-all">
              {project.title}
            </p>
            <p className="text-xs w-full block opacity-70 text-right">
              {project.description}
            </p>
          </a>
        ))}
        <hr className="opacity-25 my-6" />
        <h3 className="mb-4">Work</h3>
        {bt.work.map((work) => (
          <a
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between items-baseline w-full space-y-2"
            key={work.title}
          >
            <p className="text-sm hover:opacity-70 hover:ml-1 transition-all">
              {work.title}
            </p>
            <p className="text-xs block opacity-70"> # {work.year}</p>
          </a>
        ))}
      </div>
    </>
  );
};

export default WorkCol;
