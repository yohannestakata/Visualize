import ImageCard from "../../../components/ImageCard";

function ClassroomList() {
  return (
    <div className="grid grid-cols-9 gap-4">
      <ImageCard
        className="col-span-3"
        title="Classroom name"
        subtitle={"Someone's name"}
      />
      <ImageCard
        className="col-span-3"
        title="Classroom name"
        subtitle={"Someone's name"}
      />
      <ImageCard
        className="col-span-3"
        title="Classroom name"
        subtitle={"Someone's name"}
      />
      <ImageCard
        className="col-span-3"
        title="Classroom name"
        subtitle={"Someone's name"}
      />
    </div>
  );
}

export default ClassroomList;
