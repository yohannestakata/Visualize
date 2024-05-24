import DragArea from "../../../components/DragArea";
import Heading from "../../../components/Heading";
import { Separator } from "@/components/ui/separator";
import UploadModelForm from "../components/UploadModelForm";

function UploadModelLayout() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-end-10">
        <Heading as="h1">Upload Model</Heading>
        <Separator className="mt-6" />
        <div className="mt-6">
          <UploadModelForm />
        </div>
      </div>
    </div>
  );
}

export default UploadModelLayout;
