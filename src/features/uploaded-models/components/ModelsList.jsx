import { NavLink } from "react-router-dom";
import ImageCard from "../../../components/ImageCard";

function ModelsList({ models }) {
  return (
    <>
      {models?.map((model) => (
        <NavLink
          key={model._id}
          to={`/teacher/model-details?model-id=${model._id}`}
          className={"col-span-4"}
        >
          <ImageCard
            title={model.modelTitle}
            subtitle={model.department.name}
            imgUrl={model.thumbnailUrl}
            badge={model.drafted ? "Draft" : "Published"}
            badgeVariant={model.drafted ? "outline" : "default"}
          />
        </NavLink>
      ))}
    </>
  );
}

export default ModelsList;
