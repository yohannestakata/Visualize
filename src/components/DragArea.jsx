import { FileBox } from "lucide-react";
import { useState } from "react";

function DragArea({ field: { value, onChange, ...fieldProps }, setValue }) {
  const [dragEnter, setDragEnter] = useState(false);
  const [fileName, setFileName] = useState("");

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
      }`}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      onDragEnter={() => {
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
              Browse
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

      {fileName && (
        <div className="flex h-full justify-center items-center">
          <span className="text-primary">{fileName}</span>&nbsp; is ready for
          upload
        </div>
      )}
    </div>
  );
}

export default DragArea;
