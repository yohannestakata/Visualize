import Heading from "../../../components/Heading";
import { Separator } from "@/components/ui/separator";
import PrepareModelForm from "../components/PrepareModelForm";

function UploadModelLayout() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-end-10">
        <Heading as="h1">Prepare Model</Heading>
        <Separator className="mt-3" />
        <div className="mt-6">
          <PrepareModelForm />
        </div>
      </div>
    </div>
  );
}

export default UploadModelLayout;
