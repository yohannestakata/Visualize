import { Badge } from "@/components/ui/badge";

function ImageCard({
  className,
  title,
  subtitle,
  imgUrl,
  badge,
  badgeVariant,
}) {
  return (
    <div
      className={`rounded-lg border bg-card p-3 text-card-foreground shadow-sm hover:cursor-pointer hover:bg-accent ${className}`}
    >
      <div className="aspect-photo flex items-center justify-center overflow-hidden rounded-md bg-muted">
        <img
          src={imgUrl}
          alt="Classroom name thumbnail"
          className="h-full rounded-md object-cover text-sm text-muted-foreground"
        />
      </div>

      <div className="mt-3 flex flex-col gap-1 text-card-foreground">
        <div className="flex items-start justify-between gap-2">
          <span className="w-full truncate text-ellipsis break-all">
            {title}
          </span>
          {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
        </div>
        <span className="truncate text-sm capitalize text-muted-foreground">
          {subtitle}
        </span>
      </div>
    </div>
  );
}

export default ImageCard;
