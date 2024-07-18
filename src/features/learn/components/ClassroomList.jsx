import { NavLink } from "react-router-dom";
import ImageCard from "../../../components/ImageCard";

function ClassroomList({ models }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {models?.map((model) => (
        <NavLink key={model._id} to={`/learn/learn-model?modelId=${model._id}`}>
          <ImageCard
            className=""
            imgUrl={model?.thumbnailUrl}
            title={model?.modelTitle}
            subtitle={model?.teacher.nickname}
          />
        </NavLink>
      ))}
    </div>
  );
}

export default ClassroomList;
