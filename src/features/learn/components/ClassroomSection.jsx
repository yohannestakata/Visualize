import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenIcon, Boxes, Search, Star } from "lucide-react";
import ClassroomList from "./ClassroomList";
import { Button } from "@/components/ui/button";
import useGetModels from "../../../hooks/useGetModels";
import useUser from "../../../hooks/useUser";

function ClassroomSection({ openCommand }) {
  const { user } = useUser();
  const { data: models } = useGetModels({
    department: user.department.toLowerCase(),
  });

  return (
    <div>
      <Tabs defaultValue="all-models" className="w-full ">
        <div className="flex items-start gap-4 ">
          <TabsList className="">
            <TabsTrigger value="all-models">
              <Boxes className="mr-2 h-4 w-4" /> All Models
            </TabsTrigger>
            <TabsTrigger value="my-classrooms">
              <BookOpenIcon className="mr-2 h-4 w-4" /> My Classrooms
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Star className="mr-2 h-4 w-4" /> Favorites
            </TabsTrigger>
          </TabsList>
          <Button
            variant="outline"
            className="flex w-full justify-start"
            onClick={() => {
              openCommand((open) => !open);
            }}
          >
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
        <TabsContent value="all-models" className="mt-4">
          <ClassroomList models={models?.data} />
        </TabsContent>
        <TabsContent value="my-classrooms" className="mt-4">
          <ClassroomList />
        </TabsContent>
        <TabsContent value="favorites" className="mt-4">
          <ClassroomList />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ClassroomSection;
