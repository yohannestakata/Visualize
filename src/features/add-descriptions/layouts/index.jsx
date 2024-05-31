import Heading from "../../../components/Heading";
import { Separator } from "@/components/ui/separator";
import useGetModel from "../../../hooks/useGetModel";
import { useSearchParams } from "react-router-dom";
import Model from "../../../components/Model";
import { Suspense, useEffect, useState } from "react";
import { Check, CheckCheck, Edit2, Loader2, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

function AddModelDescriptionsLayout() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("modelId");
  const { data, isPending } = useGetModel(id);
  const [clickedMesh, setClickedMesh] = useState();
  const [definitions, setDefinitions] = useState([]);
  const [definitionText, setDefinitionText] = useState("");

  function defExists(title) {
    for (let def of definitions) if (def.title === title) return true;
    return false;
  }

  function handleOnClick(e) {
    e.stopPropagation();
    setClickedMesh(e.object);
  }

  useEffect(() => {
    if (clickedMesh?.name)
      setDefinitionText(
        definitions.find((def) => def.title === clickedMesh?.name)?.definition,
      );
  }, [clickedMesh?.name, definitions]);

  function onPointerMissed(e) {
    e.stopPropagation();
    setClickedMesh("");
    setDefinitionText("");
  }

  function handleAddMesh(e) {
    e.preventDefault();
    console.log(clickedMesh?.name);
    if (defExists(clickedMesh?.name))
      setDefinitions((prev) => {
        const updatedDefs = prev.map((def) => {
          if (def.title === clickedMesh?.name)
            return { ...def, definition: definitionText };
          else return { ...def };
        });

        return updatedDefs;
      });
    else
      setDefinitions((prev) => [
        ...prev,
        { title: clickedMesh?.name, definition: definitionText },
      ]);
    setDefinitionText("");
    setClickedMesh("");
  }

  if (isPending) return "Loading model...";
  return (
    <div>
      <div>
        <Heading as="h1">Add Model Definitions</Heading>
      </div>
      <div className="mt-5 grid grid-cols-12 grid-rows-1 gap-4">
        <div className="col-span-6 flex flex-col gap-4 ">
          <div className="aspect-video overflow-hidden rounded-lg border">
            <Suspense
              fallback={
                <Loader2 className="mx-auto my-auto h-full animate-spin" />
              }
            >
              {data?.modelUrl && (
                <Model
                  modelUrl={data?.modelUrl}
                  onClick={handleOnClick}
                  clickedMesh={clickedMesh}
                  onPointerMissed={onPointerMissed}
                />
              )}
            </Suspense>
          </div>

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

            <Button
              type="submit"
              variant="secondary"
              className="w-full"
              disabled={!clickedMesh}
              onClick={handleAddMesh}
            >
              {!defExists(clickedMesh?.name) ? (
                <span className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" /> Add
                </span>
              ) : (
                <span className="flex items-center">
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </span>
              )}
            </Button>
          </div>
        </div>
        <div className="col-span-6 ">
          <div className="flex h-full flex-col items-end">
            <ScrollArea className="aspect-video w-full flex-1 rounded-md border bg-card p-4">
              <Heading as={"h2"}>Added definitions</Heading>
              <Accordion type="single" collapsible>
                {definitions.map((def) => (
                  <AccordionItem value={def.title} key={def.title}>
                    <AccordionTrigger>{def.title}</AccordionTrigger>
                    <AccordionContent>{def.definition}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
            <Button className="mt-2">
              <Upload className="mr-2 h-4 w-4" /> Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModelDescriptionsLayout;
