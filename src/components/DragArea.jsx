import { CheckCheck, FileBox } from "lucide-react";
import { useState } from "react";

function FileInput({ text, handleOnChange }) {
  return (
    <label
      htmlFor="select-file"
      className="text-primary underline hover:cursor-pointer pointer-events-auto"
    >
      {text}
      <input
        type="file"
        id="select-file"
        className="hidden"
        onChange={handleOnChange}
      />
    </label>
  );
}

function DragArea({ field: { value, onChange, ...fieldProps }, errors }) {
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
      setFileName(droppedFile.name);
      setDragEnter(false);
    }
  }

  function handleOnDragOver(e) {
    e.preventDefault();
  }

  function handleOnChange(e) {
    e.preventDefault();
    const file = e.target.files[0];

    onChange(file);
    // setValue("model", file);
    setFileName(file.name);
  }
  return (
    <div
      className={`aspect-video w-full border-2 rounded-lg border-dashed overflow-hidden  ${
        dragEnter && "border-primary"
      } ${error && "border-destructive"}`}
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
            Drag and drop a supported 3D file or{" "}
            <FileInput handleOnChange={handleOnChange} text="browse" />
          </h3>
          <span className="text-muted-foreground text-sm">
            Follow the guideline for more information on supported file formats
          </span>
        </div>
      )}

      {fileName && !error && (
        <div className="flex flex-col gap-2 h-full justify-center items-center">
          <div className="flex items-center justify-center">
            <CheckCheck className="text-primary w-4 h-4 mr-2" />
            <span>{fileName} loaded</span>&nbsp;
          </div>
          <span>
            <FileInput handleOnChange={handleOnChange} text="Change file" />
          </span>
        </div>
      )}

      {error && (
        <div className="flex flex-col gap-2 h-full justify-center items-center">
          <span className="">{fileName}</span>
          <span className="text-destructive">{error}</span>
          <span className="text-muted-foreground text-sm ">
            Follow the guideline for more information on supported file formats
          </span>
          <FileInput handleOnChange={handleOnChange} text="Change file" />
        </div>
      )}
    </div>
  );
}

export default DragArea;
