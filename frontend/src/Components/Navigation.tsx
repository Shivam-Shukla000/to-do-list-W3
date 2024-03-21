import {
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  Drawer,
  DrawerContent,
} from "@chakra-ui/react";

export default function Navigation(props: {
  open: boolean;
  close: () => void;
}) {
  return (
    <>
      <Drawer placement="left" onClose={props.close} isOpen={props.open}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
          <DrawerBody>
            <p>Your profile</p>
            <p>api Doc</p>
            <p>settings</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
