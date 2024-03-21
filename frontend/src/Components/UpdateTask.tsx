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
import { updateGoal } from "../utils/goal";
import { useState } from "react";
type Todos = {
  _id: string;
  text: string;
};
export default function UpdateTask(props: {
  state: boolean;
  close: () => void;
  updateTextId: string;
  updateText: string;
  todos: Todos[];
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
  setUpdateText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [message, setMessage] = useState("");
  function handleClick() {
    (async () => {
      try {
        const response = await updateGoal(props.updateTextId, props.updateText);
        const data = await response.data;
        if (data.updatedGoal._id === props.updateTextId) {
          setMessage("Task update sucess");
          const newProp = props.todos.filter(
            (todo) => todo._id !== data.updatedGoal._id
          );
          newProp.unshift(data.updatedGoal);
          props.setTodos([...newProp]);
        }
      } catch (error) {
        setMessage("Task update failed");
        console.log(error);
      }
    })();
  }

  return (
    <>
      <Modal isOpen={props.state} onClose={props.close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="your task"
              value={props.updateText}
              onChange={(e) => props.setUpdateText(e.target.value)}
            ></Textarea>
            <Box>{message}</Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={props.close}>
              Close
            </Button>
            <Button onClick={handleClick} colorScheme="blue" mr={3}>
              Update Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
