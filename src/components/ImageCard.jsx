function ImageCard({ className, title, subtitle }) {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground hover:cursor-pointer hover:bg-accent p-3 shadow-sm ${className}`}
    >
      <div className="bg-muted aspect-video overflow-hidden rounded-md flex items-center justify-center">
        <img
          src={`https://picsum.photos/id/${
            Math.floor(Math.random() * 1000) + 1
          }/500/600.webp`}
          alt="Classroom name thumbnail"
          className="rounded-md object-cover w-full h-full text-sm text-muted-foreground"
        />
      </div>

      <div className="flex flex-col gap-1 text-card-foreground mt-3">
        <span>{title}</span>
        <span className="text-muted-foreground text-sm">{subtitle}</span>
      </div>
    </div>
  );
}

export default ImageCard;
