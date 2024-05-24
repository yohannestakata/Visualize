import { CheckCheck, FileBox } from "lucide-react";
import { useState } from "react";

function DragArea({
  field: { value, onChange, ...fieldProps },
  setValue,
  errors,
}) {
  const [dragEnter, setDragEnter] = useState(false);
  const [fileName, setFileName] = useState("");

  const error = errors?.model?.message;

  function handleOnDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;

    if (files.length > 0) {
      const droppedFile = files[0];

      onChange(droppedFile);
      setValue("model", droppedFile);
      setFileName(droppedFile.name);
    }
  }

  function handleOnDragOver(e) {
    e.preventDefault();
  }

  function handleOnChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    onChange(file);
    setValue("model", file);
    setFileName(file.name);
  }
  return (
    <div
      className={`aspect-video w-full border-2 rounded-lg border-dashed overflow-hidden  ${
        (fileName || dragEnter) && "border-primary"
      } ${error && "border-destructive"}`}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      onDragEnter={(e) => {
        setDragEnter(true);
      }}
      onDragLeave={() => {
        setDragEnter(false);
      }}
    >
      {!fileName && (
        <div className="pointer-events-none flex justify-center items-center flex-col gap-2 h-full">
          <FileBox />
          <h3>
            Drag and drop a supported 3D file format or{" "}
            <label
              htmlFor="select-file"
              className="text-primary underline hover:cursor-pointer pointer-events-auto"
            >
              browse
              <input
                type="file"
                id="select-file"
                className="hidden"
                onChange={handleOnChange}
              />
            </label>
          </h3>
          <span className="text-muted-foreground text-sm">
            Follow the guideline for more information on supported file formats
          </span>
        </div>
      )}

      {fileName && !error && (
        <div className="flex h-full justify-center items-center">
          <CheckCheck className="text-primary w-4 h-4 mr-2" />
          <span>{fileName}</span>&nbsp;
        </div>
      )}

      {error && (
        <div className="flex flex-col gap-2 h-full justify-center items-center">
          <span className="text-destructive">{fileName}</span>
          <span>{error}</span>
          <span className="text-muted-foreground text-sm">
            Follow the guideline for more information on supported file formats
          </span>
          <label
            htmlFor="select-file"
            className="text-primary underline hover:cursor-pointer pointer-events-auto mt-2"
          >
            Browse
            <input
              type="file"
              id="select-file"
              className="hidden"
              onChange={handleOnChange}
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default DragArea;
