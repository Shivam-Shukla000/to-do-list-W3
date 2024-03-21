import { Link as ReactLink } from "react-router-dom";
import { useState } from "react";
import {
  AbsoluteCenter,
  FormControl,
  Box,
  Input,
  Button,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { login } from "../utils/auth";
import { userAuthStore } from "../store/store";

export default function Login() {
  const inputMargin = "10px 5px 10px 5px";
  const placeHolderColor = "gray";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [InvalidCred, SetInvalidCred] = useState("");
  async function handleClick() {
    try {
      const formData = {
        email,
        password,
      };
      const response = await login(formData);
      if (!response) {
        SetInvalidCred("invalid credentials");
        return;
      }
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      const id = response.data._id;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("id", id);
      const setUser = userAuthStore((state: any) => state.setUser);
      const user = {
        username: response.data.name,
        email: response.data.email,
      };
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box
        bg={"#eeeedd"}
        border="4px"
        w={"100vw"}
        h={"100vh"}
        m={"0px"}
        p={"0px"}
      >
        <AbsoluteCenter
          p={"30px"}
          border="1px"
          borderColor="black"
          borderRadius="10px"
          bg={"#eeeedd"}
        >
          <Flex flexDirection={"column"}>
            <FormControl>
              <Input
                border="1px"
                borderColor="black"
                m={inputMargin}
                placeholder={"Email"}
                _placeholder={{ color: placeHolderColor }}
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <br />
              <Input
                border="1px"
                borderColor="black"
                m={inputMargin}
                placeholder={"Password"}
                _placeholder={{ color: placeHolderColor }}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              <br />
              <Box>{InvalidCred}</Box>
              <br />
              <Button
                m={inputMargin}
                onClick={handleClick}
                colorScheme="blue"
                bg={"#444444"}
              >
                Login
              </Button>
            </FormControl>
            <br />
            <Box color={"black"}>
              don't have an account? click{" "}
              <ChakraLink as={ReactLink} color="lightblue" to="/register">
                here
              </ChakraLink>
            </Box>
          </Flex>
        </AbsoluteCenter>
      </Box>
    </>
  );
}
