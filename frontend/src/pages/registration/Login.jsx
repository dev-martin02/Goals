import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchHook } from "@/helpers/fetchHooks";
import { useTaskStore } from "@/store/store";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { setUsername, Username } = useTaskStore();
  const [userFormData, setUserFormData] = useState(null);
  const { data, fetchData } = useFetchHook("login", "post", userFormData);
  let navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formDataObject = {};
    const form = event.target;
    const formData = new FormData(form);
    for (let key of formData.keys()) {
      formDataObject[key] = formData.get(key);
    }
    console.log();
    setUserFormData(formDataObject);
    fetchData("login", "post", formDataObject);
  };

  const controlData = () => {
    if (data) {
      if (data.user) {
        setUsername(data.user);
        navigate("/");
        console.log(data);
      } else {
        console.error("Error during login:");
        console.log(data);
      }
    }
  };

  //Is doing double refresh
  useEffect(() => {
    controlData();
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1>Login Page</h1>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          placeholder="Please write your email"
          name="email"
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

        <button onClick={() => console.log("hey")}>oh</button>

        <Button type="submit">Login</Button>
      </form>

      <span>Doesn't have an account?</span>
      <Link to={"/signUp"} className="text-blue-600 underline">
        Sign Up Here!
      </Link>
    </div>
  );
}

/*
  What is the purpose of this page? 
    - Make the user Login to his account
    - Encourage new user to create an account 
    - Easier way to create an account or login 

    - Add alert message to this page and signUp page
    */
