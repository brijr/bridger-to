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
      className="group flex w-full items-baseline justify-between space-y-3 transition-all hover:opacity-70"
    >
      <p className="flex w-fit items-center gap-1 text-base transition-all group-hover:pl-1">
        {title}{" "}
        <ExternalLinkIcon className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
      </p>
      <p className="block w-fit text-right text-xs opacity-70">{description}</p>
    </a>
  );
};

export default DetailLink;
