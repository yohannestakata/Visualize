import ImageCard from "../../../components/ImageCard";

function ModelsList({ models }) {
  return (
    <>
      {models?.map((model) => (
        <ImageCard
          key={model._id}
          title={model.modelTitle}
          subtitle={model.department}
          imgUrl={model.thumbnailUrl}
          className={"col-span-4"}
          badge={model.drafted ? "Draft" : "Published"}
          badgeVariant={model.drafted ? "outline" : "default"}
        />
      ))}
    </>
  );
}

export default ModelsList;
