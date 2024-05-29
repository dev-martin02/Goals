import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/registration/SignUp";
import Login from "./pages/registration/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
