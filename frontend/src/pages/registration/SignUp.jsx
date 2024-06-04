import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
/* 
  WHAT IS THE PURPOSE OF THIS PAGE?   
    - Make user registration easier and fast 
*/

export default function SignUp() {
  const [confPassword, setConfPassword] = useState("");

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const getFormData = new FormData(event.target);
    const formData = {};
    for (const key of getFormData.keys()) {
      formData[key] = getFormData.get(key);
    }
    try {
      const data = await axios.post("http://localhost:3000/signUp", formData);
      console.log(data.data.message);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="flex flex-col p-2">
      <h1 className="flex justify-center">Sign Up</h1>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-2">
        <label htmlFor="username">Name</label>
        <Input
          type="text"
          id="username"
          placeholder="Write your name"
          name="username"
          required
        />

        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Write your email"
          required
        />

        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          placeholder="Write your password "
          name="password"
          required
        />

        <label htmlFor="confPassword">Confirm Password</label>
        <Input
          type="password"
          id="confPassword"
          placeholder="Please confirm your password"
          required
        />

        <Button>Add User</Button>
      </form>
    </div>
  );
}
