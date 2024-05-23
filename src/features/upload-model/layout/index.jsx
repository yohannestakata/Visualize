import DragArea from "../../../components/DragArea";
import Heading from "../../../components/Heading";
import { Separator } from "@/components/ui/separator";

function UploadModelLayout() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-4 col-end-10">
        <Heading as="h1">Upload Model</Heading>
        <Separator className="mt-6" />
        <div className="mt-6">
          <DragArea />
        </div>
      </div>
    </div>
  );
}

export default UploadModelLayout;
