import ImageCard from "../../../components/ImageCard";

function ClassroomList({ models }) {
  return (
    <div className="grid grid-cols-9 gap-4">
      {models?.map((model) => {
        return (
          <ImageCard
            key={model._id}
            className="col-span-3"
            imgUrl={model?.thumbnailUrl}
            title={model?.modelTitle}
            subtitle={model?.teacher.nickname}
          />
        );
      })}
    </div>
  );
}

export default ClassroomList;
