import { CheckCheck, Image } from "lucide-react";
import { useState } from "react";

function FileInput({ text, handleOnChange }) {
  return (
    <label
      htmlFor="select-file"
      className="pointer-events-auto text-primary underline hover:cursor-pointer"
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

function ImageDragArea({
  // eslint-disable-next-line no-unused-vars
  field: { value, onChange, ...fieldProps },
  errors,
  imageUrl,
}) {
  const [dragEnter, setDragEnter] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const reader = new FileReader();

  const error = errors?.thumbnail?.message;

  function setImageFromFile(file) {
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      setFileUrl(event.target.result);
    };
  }

  function handleOnDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;

    if (files.length > 0) {
      const droppedFile = files[0];

      onChange(droppedFile);
      setFileName(droppedFile.name);
      setImageFromFile(droppedFile);
      setDragEnter(false);
    }
  }

  function handleOnDragOver(e) {
    e.preventDefault();
  }

  function handleOnChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    setImageFromFile(file);
    onChange(file);
    setFileName(file.name);
  }

  return (
    <div
      onPointerOver={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      className={`aspect-photo relative w-full overflow-hidden rounded-lg border-2 border-dashed  ${
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
      <div
        className={`absolute -z-10 flex h-full w-full items-center justify-center`}
      >
        <img src={fileUrl || imageUrl} alt="" className="h-full object-cover" />
      </div>

      {(isHovering || error) && (
        <div className="flex h-full w-full items-center justify-center bg-background/70  backdrop-blur-xl">
          {!fileName && !error && (
            <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-2">
              <Image />
              <h3>
                Drag and drop a supported image format or{" "}
                <FileInput handleOnChange={handleOnChange} text="browse" />
              </h3>
              <span className="text-sm text-muted-foreground">
                Follow the guideline for more information on supported file
                formats
              </span>
            </div>
          )}

          {fileName && !error && (
            <div className="flex h-full flex-col items-center justify-center gap-2 ">
              <div className="flex items-center justify-center px-12 text-center">
                <CheckCheck className="mr-2 h-4 w-4 text-primary" />
                <span>{fileName} loaded</span>&nbsp;
              </div>
              <span>
                <FileInput handleOnChange={handleOnChange} text="Change file" />
              </span>
            </div>
          )}

          {error && (
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <span className="">{fileName}</span>
              <span className="text-destructive">{error}</span>
              <span className="text-sm text-muted-foreground ">
                Follow the guideline for more information on supported file
                formats
              </span>
              <FileInput handleOnChange={handleOnChange} text="Change file" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageDragArea;
