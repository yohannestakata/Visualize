import { FileBox } from "lucide-react";

function DragArea({ field }) {
  return (
    <div className="aspect-video w-full border-2 rounded-lg border-dashed overflow-hidden flex justify-center items-center flex-col gap-2">
      <FileBox />
      <h3>Drag and drop a supported 3D file format</h3>
      <span className="text-muted-foreground text-sm">
        Follow the guideline for more information on supported file formats
      </span>
    </div>
  );
}

export default DragArea;
