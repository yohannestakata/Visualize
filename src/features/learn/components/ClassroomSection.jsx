import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenIcon, Boxes, Search } from "lucide-react";
import ClassroomList from "./ClassroomList";
import { Button } from "@/components/ui/button";

function ClassroomSection({ openCommand }) {
  return (
    <div>
      <Tabs defaultValue="classrooms" className="w-full ">
        <div className="gap-4 items-start flex ">
          <TabsList className="">
            <TabsTrigger value="all-models">
              <Boxes className="w-4 h-4 mr-2" /> All Models
            </TabsTrigger>
            <TabsTrigger value="my-classrooms">
              <BookOpenIcon className="w-4 h-4 mr-2" /> My Classrooms
            </TabsTrigger>
          </TabsList>
          <Button
            variant="outline"
            className="w-full flex justify-start"
            onClick={() => {
              openCommand((open) => !open);
            }}
          >
            <Search className="w-4 h-4 mr-2" /> Search
          </Button>
        </div>
        <TabsContent value="all-models" className="mt-4">
          <ClassroomList />
        </TabsContent>
        <TabsContent value="my-classrooms" className="mt-4">
          <ClassroomList />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ClassroomSection;
