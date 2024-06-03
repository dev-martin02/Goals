import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Link } from "react-router-dom";

/*
  What is the purpose of this page? 
    - Make the user Login to his account
    - Encourage new user to create an account 
    - Easier way to create an account or login 
*/

export default function Login() {
  const url = "http://localhost:3000/login";

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formDataObject = {};

    // Go to each key and create a new plain object with the content inside of it
    for (let key of formData.keys()) {
      formDataObject[key] = formData.get(key);
    } // Pass the form element to FormData
    console.log(formDataObject);
    try {
      const sendData = await axios.post(url, formDataObject);
      console.log(sendData);
      if (sendData.ok) {
        console.log("Success:", sendData);
      } else {
        console.log("Update failed:", sendData.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1>Login Page</h1>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-1">
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          id="username"
          placeholder="Please write your username"
          name="username"
          required
        />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Please write your password"
          required
        />

        <Button type="submit">Login</Button>
      </form>

      <span>Doesn't have an account?</span>
      <Link to={"/signUp"} className="text-blue-600 underline">
        Sign Up Here!
      </Link>
    </div>
  );
}
