import Heading from "../../../components/Heading";
import PrepareModelForm from "../components/PrepareModelForm";

function UploadModelLayout() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-start-4 col-end-10">
        <Heading as="h1">Prepare Model</Heading>

        <div className="mt-4">
          <PrepareModelForm />
        </div>
      </div>
    </div>
  );
}

export default UploadModelLayout;
