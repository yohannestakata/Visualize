import ImageCard from "../../../components/ImageCard";

function ModelsList({ models }) {
  return (
    <div className="mt-6 grid grid-cols-12 gap-4">
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
    </div>
  );
}

export default ModelsList;
