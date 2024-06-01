import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Heading from "../../../components/Heading";
import { Upload } from "lucide-react";

function AddedDefinitions({ definitions }) {
  return (
    <div className="flex h-full flex-col items-end">
      <ScrollArea className="aspect-video w-full flex-1 rounded-md border bg-card p-4">
        <Heading as={"h2"}>Added definitions</Heading>
        {definitions.length > 0 ? (
          <Accordion type="single" collapsible>
            {definitions.map((def) => (
              <AccordionItem value={def.title} key={def.title}>
                <AccordionTrigger>{def.title}</AccordionTrigger>
                <AccordionContent className="break-all">
                  {def.definition}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <span className="text-sm text-muted-foreground">
            Nothing added yet
          </span>
        )}
      </ScrollArea>
      <Button className="mt-2">
        <Upload className="mr-2 h-4 w-4" /> Publish
      </Button>
    </div>
  );
}

export default AddedDefinitions;
