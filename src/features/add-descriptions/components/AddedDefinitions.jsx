import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

import Heading from "../../../components/Heading";

function AddedDefinitions({ definitions }) {
  return (
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
        <span className="text-sm text-muted-foreground">Nothing added yet</span>
      )}
    </ScrollArea>
  );
}

export default AddedDefinitions;
