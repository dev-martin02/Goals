import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

/*
  What is the purpose of this page? 
    - Make the user Login to his account
    - Encourage new user to create an account 
    - Easier way to create an account or login 

*/

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1>Login Page</h1>
      <form className="flex flex-col gap-1">
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          id="username"
          placeholder="Please write your username"
          require
        />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          placeholder="Please write your password"
        />

        <Button>Login</Button>
      </form>
      <span>Doesn't have an account?</span>
      <Link to={"/signUp"} className="text-blue-600 underline ">
        Sign Up Here!
      </Link>
    </div>
  );
}
