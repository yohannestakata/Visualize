import { Paintbrush, Plus, Replace } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function AddDefinition({
  clickedMesh,
  setDefinitionText,
  definitionText,
  handleAddMesh,
  defExists,
}) {
  return (
    <div className="flex w-full flex-col items-start space-y-2 ">
      <div className="flex w-full items-center justify-between">
        <Label htmlFor="description">Mesh description</Label>
        {!clickedMesh?.name && (
          <p className="text-sm font-medium leading-none text-muted-foreground">
            Select mesh to add description.
          </p>
        )}
      </div>
      <Textarea
        onChange={(e) => setDefinitionText(e.target.value)}
        placeholder={`Enter description ${clickedMesh?.name ? "for " + clickedMesh?.name : ""}`}
        id="description"
        disabled={!clickedMesh}
        value={definitionText}
      />

      <div className="flex w-full gap-2 ">
        <Button
          type="reset"
          variant="outline"
          disabled={!clickedMesh}
          onMouseDown={() => {
            setDefinitionText("");
          }}
        >
          <Paintbrush className="mr-2 h-4 w-4" />
          Clear
        </Button>

        <Button
          type="submit"
          variant=""
          disabled={!clickedMesh}
          onMouseDown={handleAddMesh}
        >
          {!defExists ? (
            <span className="flex items-center">
              <Plus className="mr-2 h-4 w-4" /> Add
            </span>
          ) : (
            <span className="flex items-center">
              <Replace className="mr-2 h-4 w-4" />
              Replace
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}

export default AddDefinition;
