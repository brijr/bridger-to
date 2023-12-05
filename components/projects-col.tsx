import bt from "@/bt.config";
import DetailLink from "./detail-link";

const ProjectCol = () => {
  return (
    <>
      <div className="w-full">
        <h3 className="my-4">
          <span className="opacity-70 text-sm">#</span> Ventures
        </h3>
        <hr className="opacity-25 my-6" />

        {bt.ventures.map((project) => (
          <DetailLink
            link={project.link}
            title={project.title}
            description={project.description}
          ></DetailLink>
        ))}

        <h3 className="my-4">
          <span className="opacity-70 text-sm">#</span> Websites
        </h3>
        <hr className="opacity-25 my-6" />

        {bt.websites.map((project) => (
          <DetailLink
            link={project.link}
            title={project.title}
            description={project.description}
          ></DetailLink>
        ))}

        <h3 className="my-4">
          <span className="opacity-70 text-sm">#</span> Socials
        </h3>
        <hr className="opacity-25 my-6" />

        {bt.socials.map((project) => (
          <DetailLink
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
