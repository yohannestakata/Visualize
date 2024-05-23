import { FileBox } from "lucide-react";

function DragArea() {
  return (
    <div
      className="aspect-video w-full rounded-lg border-dashed overflow-hidden flex justify-center items-center flex-col gap-2"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23333' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='6' stroke-linecap='square'/%3e%3c/svg%3e")`,
      }}
    >
      <FileBox />
      <h3>Drag and drop a supported 3D file format</h3>
      <span className="text-muted-foreground text-sm">
        Follow the guideline for more information on supported file formats
      </span>
    </div>
  );
}

export default DragArea;
