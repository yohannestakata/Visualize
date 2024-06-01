import Heading from "../../../components/Heading";
import useGetModel from "../../../hooks/useGetModel";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddedDefinitions from "../components/AddedDefinitions";
import AddDefinition from "../components/AddDefinition";
import AddedModel from "../components/AddedModel";

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
          <AddedDefinitions definitions={definitions} />
        </div>
      </div>
    </div>
  );
}

export default AddModelDescriptionsLayout;
