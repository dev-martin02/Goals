import { useState } from "react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useTaskStore } from "@/store/store";
import { Link } from "react-router-dom";
import CurrentTask from "@/components/ui/Tasks/CurrentTask";
import EditedTask from "@/components/ui/Tasks/EditedTask";
import PastTask from "@/components/ui/Tasks/PastTask";
import barIcon from "../assets/barIcon.svg";
import NavBar from "@/components/ui/navBar/NavBar";
/*
  What is the purpose of this page?
    - Make the user plan his Task and be able to see his task easily
    - Encourage the user to keep tasks below than 5
    - Simply design and strong functionality  

  What to fix?
   - Improve UI (position of the To-Do) 
   - Make it responsive
   - Set limits for task no more than 5 
   - Improve the alert message


 */

export default function Home() {
  const { userTasks, trackUserInput, addUserTask, inputTask, editedTaskId } =
    useTaskStore();
  const [display, setDisplay] = useState(false);

  function addTask() {
    if (inputTask) {
      addUserTask(inputTask);
      return trackUserInput("");
    }
    alert("You must write something");
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col mt-20 items-center">
        <div className="flex flex-col justify-center items-center w-90">
          {/* Title */}
          <h1 className="text-5xl mb-10">To Do</h1>
          {/* Input */}
          <div className="flex">
            <Input
              type="text"
              placeholder="Write your task here"
              onChange={(e) => trackUserInput(e.target.value)}
              value={inputTask}
            />
            <Button className="ml-2 bg-green-600" onClick={addTask}>
              Add task
            </Button>
          </div>

          {/* Current and Past task */}
          <div className="flex w-40 justify-around">
            <p>Current</p>
            <p>Past</p>
          </div>

          {/* Tasks */}
          <ul className="flex flex-col items-center">
            {userTasks.map(({ taskName, id, index }) => (
              <li className="flex text-center" key={id}>
                {id === editedTaskId ? (
                  <EditedTask />
                ) : (
                  <CurrentTask taskName={taskName} id={id} />
                )}
              </li>
            ))}
            <h3>Past Task</h3>
            {<PastTask />}
          </ul>
        </div>
      </div>
    </>
  );
}
