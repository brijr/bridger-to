import bt from "@/bt.config";
import DetailLink from "./detail-link";

const ProjectCol = () => {
  return (
    <>
      <div className="mb-8 w-full md:mb-0">
        <h3 className="my-4">
          <span className="text-base opacity-70">#</span> Ventures
        </h3>
        <hr className="my-2 opacity-25" />

        {bt.ventures.map((project) => (
          <DetailLink
            key={project.title}
            link={project.link}
            title={project.title}
            description={project.description}
          ></DetailLink>
        ))}

        <h3 className="mt-8">
          <span className="text-base opacity-70">#</span> Websites
        </h3>
        <hr className="my-2 opacity-25" />

        {bt.websites.map((project) => (
          <DetailLink
            key={project.title}
            link={project.link}
            title={project.title}
            description={project.description}
          ></DetailLink>
        ))}

        <h3 className="mt-8">
          <span className="text-base opacity-70">#</span> Socials
        </h3>
        <hr className="my-2 opacity-25" />

        {bt.socials.map((project) => (
          <DetailLink
            key={project.name}
            link={project.url}
            title={project.name}
            description={project.username}
          ></DetailLink>
        ))}
      </div>
    </>
  );
};

export default ProjectCol;
