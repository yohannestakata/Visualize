import { Info, Trash2 } from "lucide-react";
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

function DangerArea({ modelName }) {
  const [verifyText, setVerifyText] = useState("");
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
                <Label htmlFor="model-name">
                  Type{" "}
                  <span className="font-medium text-destructive">
                    {modelName}
                  </span>{" "}
                  to verify.
                </Label>
                <Input
                  id="model-name"
                  value={verifyText}
                  className="col-span-3"
                  onChange={(e) => setVerifyText(e.target.value)}
                  placeholder="Enter model name"
                  autocomplete="off"
                />
              </div>
              <DialogFooter>
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={modelName !== verifyText}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete model
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <span className="flex items-center text-sm font-medium">
            <Info className="mr-2 h-4 w-4" />
            Deleting will completely remove your access!
          </span>
        </div>
      </div>
    </>
  );
}

export default DangerArea;
