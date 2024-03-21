import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { redirect } from "react-router-dom";
export default function Logout(props: { state: boolean; close: () => void }) {
  const [message, setMessage] = useState("");
  function handleClick() {
    props.close();
    return redirect("/folders");
  }
  return (
    <>
      <Modal isOpen={props.state} onClose={props.close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Warning</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>Are you sure you want to logout</Box>
            <Box>{message}</Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={props.close}>
              No
            </Button>
            <Button onClick={handleClick} colorScheme="blue" mr={3}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
