import { AspectRatio } from "@/components/ui/aspect-ratio";

function ImageCard({ className }) {
  return (
    <div
      className={`rounded-md border bg-card hover:cursor-pointer hover:bg-accent p-4 ${className}`}
    >
      <div className="bg-muted aspect-video overflow-hidden rounded-md flex items-center justify-center">
        <img
          src={`https://picsum.photos/id/${
            Math.floor(Math.random() * 1000) + 1
          }/250/300.webp`}
          alt="Image"
          className="rounded-md object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col text-card-foreground mt-3">
        <span>Classroom Name</span>
        <span className="text-muted-foreground text-sm">Sub title</span>
      </div>
    </div>
  );
}

export default ImageCard;
