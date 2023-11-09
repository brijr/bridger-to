import bt from "@/bt.config";

const ProjectCol = () => {
  return (
    <>
      <div></div>

      <div className="w-full">
        <h3 className="mb-4">
          <span className="opacity-70 text-sm">#</span> Ventures
        </h3>
        {bt.ventures.map((project) => (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between items-baseline w-full space-y-2 hover:opacity-70 hover:ml-1 hover:-mr-1 transition-all"
            key={project.title}
          >
            <p className="text-sm w-full">{project.title}</p>
            <p className="text-xs w-full block opacity-70 text-right">
              {project.description}
            </p>
          </a>
        ))}

        <hr className="opacity-25 my-6" />

        <h3 className="mb-4">
          <span className="opacity-70 text-sm">#</span> Websites
        </h3>
        {bt.websites.map((project) => (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between items-baseline w-full space-y-2 hover:opacity-70 hover:ml-1 hover:-mr-1 transition-all"
            key={project.title}
          >
            <p className="text-sm">{project.title}</p>
            <p className="text-xs w-full block opacity-70 text-right">
              {project.description}
            </p>
          </a>
        ))}
      </div>
    </>
  );
};

export default ProjectCol;
