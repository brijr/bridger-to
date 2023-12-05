import bt from "@/bt.config";
import DetailLink from "./detail-link";

const WorkCol = () => {
  return (
    <>
      <div></div>

      <div className="w-full">
        <h3 className="my-4">
          <span className="opacity-70 text-sm">#</span> Software
        </h3>
        <hr className="opacity-25 my-6" />

        {bt.projects.map((project) => (
          <DetailLink
            link={project.link}
            title={project.title}
            description={project.description}
          ></DetailLink>
        ))}

        <h3 className="my-4">
          <span className="opacity-70 text-sm">#</span> Work
        </h3>
        <hr className="opacity-25 my-6" />

        {bt.work.map((work) => (
          <DetailLink
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
