import { Info, Loader2, Trash2 } from "lucide-react";
import Heading from "../../../components/Heading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import useDeleteModel from "../hooks/useDeleteModel";

function DangerArea({ modelName, id }) {
  const [verifyText, setVerifyText] = useState("");
  const { mutate: deleteModel, isPending } = useDeleteModel(id);

  function handleDelete(e) {
    e.preventDefault();
    deleteModel(id);
  }

  return (
    <>
      <div className="mt-6 rounded-lg border border-destructive p-6">
        <Heading as={"h3"} className="text-destructive">
          Danger area
        </Heading>
        <div className="mt-4 flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete model
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete model</DialogTitle>
                <DialogDescription>
                  Once deleted, you won&apos;t be able to recover it back.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <Label htmlFor="model-name" className="mb-2">
                  Type{" "}
                  <span className="font-medium text-destructive">
                    {modelName}
                  </span>{" "}
                  to verify.
                </Label>
                <Input
                  id="model-name"
                  value={verifyText}
                  className="col-span-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                  onChange={(e) => setVerifyText(e.target.value)}
                  placeholder="Enter model name"
                  autocomplete="off"
                  onPaste={(e) => e.preventDefault()}
                />
              </div>
              <DialogFooter>
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={modelName !== verifyText || isPending}
                  onClick={handleDelete}
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Delete model
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <span className="flex items-center text-sm font-medium">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Info className="mr-2 h-4 w-4" />
            )}
            Deleting will completely remove your access!
          </span>
        </div>
      </div>
    </>
  );
}

export default DangerArea;
