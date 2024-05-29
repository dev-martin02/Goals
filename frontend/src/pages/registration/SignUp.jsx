import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
/* 
  WHAT IS THE PURPOSE OF THIS PAGE?   
    - Make user registration easier and fast 
*/

export default function SignUp() {
  return (
    <div className="flex flex-col p-2">
      <h1 className="flex justify-center">Sign Up</h1>
      <form className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <Input type="text" id="name" placeholder="Write your name" required />

        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          placeholder="Write your email"
          required
        />

        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          placeholder="Write your password "
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
