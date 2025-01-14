import * as React from "react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ProfileForm from "../details/EditProfile";
import { Transaction } from "@/types";

function TestDialogEdit({ data }: { data?: Transaction }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-teal-700 text-white" variant="outline">
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          {/** will add a prop so when the save is cick the form dropsdown */}
          <ProfileForm
            className={""}
            data={data as Transaction}
            setState={setOpen}
          />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-teal-700 text-white" variant="outline">
          Edit Profile
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white text-black-2">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm
          className="px-4"
          data={data as Transaction}
          setState={setOpen}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default TestDialogEdit;
