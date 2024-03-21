import { Flex, Box, Button } from "@chakra-ui/react";

import { MdDelete, MdModeEdit } from "react-icons/md";

export default function TodoElement(props) {
  const id = props.id;
  const value = props.value;
  function handcleEditClick() {
    props.setUpdateText(value);
    props.setUpdateTextId(id);
    props.updateStateOn();
  }
  function handleDeleteClick() {
    props.setDeleteTaskId(id);
    props.deleteStateOn();
  }

  return (
    <>
      <Flex
        w={"100%"}
        maxWidth={"800px"}
        marginX={"auto"}
        bg={"#1E1E1E"}
        border={"1px solid #eeeeee"}
        borderRadius={"15px"}
      >
        <Box
          textAlign={"center"}
          textColor={"white"}
          m={"5px auto 5px 5px"}
          bg={"#1E1E1E"}
          id={id}
          p={"10px 5px 10px 15px "}
        >
          {value}
        </Box>
        <Box m={"auto 0px auto auto"}>
          <Button onClick={handcleEditClick} m={"0px 10px 0px 5px"}>
            <MdModeEdit />
          </Button>
          <Button onClick={handleDeleteClick} m={"0px 10px 0px 5px"}>
            <MdDelete />
          </Button>
        </Box>
      </Flex>
    </>
  );
}
