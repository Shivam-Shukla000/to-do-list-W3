import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
function App() {
  return (
    <>
      <ChakraProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/" element={<Layouts />}>
            <Route index element={<Home />} />
            <Route path="folders" element={<Folders />} />
          </Route> */}
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
