import React from "react";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

type DetailLinkProps = {
  link: string;
  title: string;
  description?: string;
};

const DetailLink: React.FC<DetailLinkProps> = ({
  link,
  title,
  description,
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-between items-baseline w-full group space-y-3 hover:opacity-70 transition-all"
    >
      <p className="text-sm group-hover:pl-1 transition-all w-fit flex gap-1 items-center">
        {title}{" "}
        <ExternalLinkIcon className="w-3 h-3 transition-all opacity-0 group-hover:opacity-100" />
      </p>
      <p className="w-fit text-xs block opacity-70 text-right">{description}</p>
    </a>
  );
};

export default DetailLink;
