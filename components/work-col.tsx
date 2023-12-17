import bt from "@/bt.config";
import DetailLink from "./detail-link";

const WorkCol = () => {
  return (
    <>
      <div className="w-full">
        <h3 className="my-4">
          <span className="text-base opacity-70">#</span> Software
        </h3>
        <hr className="my-2 opacity-25" />

        {bt.projects.map((project) => (
          <DetailLink
            key={project.title}
            link={project.link}
            title={project.title}
            description={project.description}
          ></DetailLink>
        ))}

        <h3 className="mt-8">
          <span className="text-base opacity-70">#</span> Work
        </h3>
        <hr className="my-2 opacity-25" />

        {bt.work.map((work) => (
          <DetailLink
            key={work.title}
            link={work.link}
            title={work.title}
            description={work.year}
          ></DetailLink>
        ))}
      </div>
    </>
  );
};

export default WorkCol;
