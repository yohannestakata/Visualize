import ImageCard from "../../../components/ImageCard";

function ClassroomList() {
  return (
    <div className="grid grid-cols-9 gap-4">
      <ImageCard className="col-span-3" />
      <ImageCard className="col-span-3" />
      <ImageCard className="col-span-3" />
      <ImageCard className="col-span-3" />
      <ImageCard className="col-span-3" />
      <ImageCard className="col-span-3" />
      <ImageCard className="col-span-3" />
      <ImageCard className="col-span-3" />
      <ImageCard className="col-span-3" />
      <ImageCard className="col-span-3" />
    </div>
  );
}

export default ClassroomList;
