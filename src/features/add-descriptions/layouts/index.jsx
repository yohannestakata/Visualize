import Heading from "../../../components/Heading";
import useGetModel from "../../../hooks/useGetModel";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddedDefinitions from "../components/AddedDefinitions";
import AddDefinition from "../components/AddDefinition";
import AddedModel from "../components/AddedModel";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import useUpdateModel from "../../../hooks/useUpdateModel";

function AddModelDescriptionsLayout() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("modelId");
  const { data, isPending } = useGetModel(id);
  const [clickedMesh, setClickedMesh] = useState();
  const [definitions, setDefinitions] = useState([]);
  const [definitionText, setDefinitionText] = useState("");

  let defExists = false;
  for (let def of definitions)
    if (def.title === clickedMesh?.name) defExists = true;

  useEffect(() => {
    if (data?.definitions) setDefinitions(data?.definitions);
  }, [data?.definitions]);

  function handleOnClick(e) {
    e.stopPropagation();
    setClickedMesh(e.object);
  }

  useEffect(() => {
    if (defExists)
      setDefinitionText(
        definitions.find((def) => def.title === clickedMesh?.name)?.definition,
      );
    else setDefinitionText("");
  }, [clickedMesh?.name, definitions, defExists]);

  function onPointerMissed(e) {
    e.stopPropagation();
    setClickedMesh("");
    setDefinitionText("");
  }

  function handleAddMesh(e) {
    e.preventDefault();

    if (defExists)
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

  const { mutate: updateModel, isPending: isUpdatingModel } =
    useUpdateModel(id);

  function onSubmit() {
    updateModel({ definitions });
  }

  if (isPending) return "Loading model...";
  return (
    <div>
      <Heading as="h1">Add Model Definitions</Heading>

      <div className="mt-5 grid grid-cols-12 grid-rows-1 gap-4">
        <div className="col-span-6 flex flex-col gap-4 ">
          <AddedModel
            data={data}
            handleOnClick={handleOnClick}
            clickedMesh={clickedMesh}
            onPointerMissed={onPointerMissed}
          />

          <AddDefinition
            clickedMesh={clickedMesh}
            setDefinitionText={setDefinitionText}
            definitionText={definitionText}
            handleAddMesh={handleAddMesh}
            defExists={defExists}
          />
        </div>
        <div className="col-span-6">
          <div className="flex h-full flex-col items-start">
            <AddedDefinitions definitions={definitions} />
            <div className="mt-2 flex w-full items-center gap-3">
              <Button
                onMouseDown={onSubmit}
                disabled={isUpdatingModel}
                // className="w-full"
              >
                <Save className="mr-2 h-4 w-4" /> Save changes
              </Button>

              {isUpdatingModel && (
                <span className="flex animate-pulse items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving changes
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModelDescriptionsLayout;
