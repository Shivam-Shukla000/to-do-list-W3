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
import { deleteGoal } from "../utils/goal";
import { useState } from "react";
export default function DeleteTask(props: {
  state: boolean;
  close: () => void;
}) {
  const [message, setMessage] = useState("");
  function handleClick() {
    (async () => {
      try {
        const response = await deleteGoal(props.deleteTaskId);
        const responseId = await response.data.id;
        if (response.message) {
          console.log(response.message);
          setMessage("Task not deleted");
          return;
        }

        if (responseId === props.deleteTaskId) {
          const newProp = props.todos.filter((todo) => todo._id !== responseId);

          props.setTodos([...newProp]);

          props.close();
        }
      } catch (error) {}
    })();
  }
  return (
    <>
      <Modal isOpen={props.state} onClose={props.close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>this will permanently delete the task</Box>
            <Box>{message}</Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={props.close}>
              Close
            </Button>
            <Button onClick={handleClick} colorScheme="blue" mr={3}>
              Delete Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
