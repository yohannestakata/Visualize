import { AspectRatio } from "@/components/ui/aspect-ratio";

function ImageCard({ className }) {
  return (
    <div
      className={`rounded-md border p-4 bg-card hover:cursor-pointer hover:bg-accent ${className}`}
    >
      <AspectRatio
        ratio={16 / 9}
        className="bg-muted overflow-hidden rounded-md flex items-center justify-center"
      >
        <img
          src="https://github.com/shadcn.png"
          alt="Image"
          className="rounded-md object-cover  overflow-hidden "
        />
      </AspectRatio>

      <div className="flex flex-col mt-3 text-card-foreground">
        <span>Classroom Name</span>
        <span className="text-muted-foreground text-sm">Sub title</span>
      </div>
    </div>
  );
}

export default ImageCard;
