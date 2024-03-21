import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { addGoal } from "../utils/goal";
import { useState } from "react";
export default function Addtask(props: { state: boolean; close: () => void }) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  async function handleTaskAdd() {
    const response = await addGoal(text);

    if (!response) {
      setMessage("something went wrong");
      return;
    }

    setMessage("Task added...");
  }
  return (
    <>
      <Modal isOpen={props.state} onClose={props.close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="your task"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></Textarea>
            <Box>{message}</Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={props.close}>
              Close
            </Button>
            <Button onClick={handleTaskAdd} colorScheme="blue" mr={3}>
              Add Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
