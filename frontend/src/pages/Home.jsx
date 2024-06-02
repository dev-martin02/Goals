import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useTaskStore } from "@/store/store";
import { Link } from "react-router-dom";
import CurrentTask from "@/components/ui/Tasks/CurrentTask";
import EditedTask from "@/components/ui/Tasks/EditedTask";
import PastTask from "@/components/ui/Tasks/PastTask";
import NavBar from "@/components/ui/navBar/NavBar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
/*
  What is the purpose of this page?
    - Make the user plan his Task and be able to see his task easily
    - Encourage the user to keep tasks below than 5
    - Simply design and strong functionality  

  What to fix?
   - Improve UI (position of the To-Do) 
   - Make it responsive


 */

export default function Home() {
  const {
    userTasks,
    trackUserInput,
    addUserTask,
    inputTask,
    editedTaskId,
    deleteUserTask,
  } = useTaskStore();
  const [display, setDisplay] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  function addTask() {
    if (inputTask) {
      addUserTask(inputTask);
      return trackUserInput("");
    } else {
      setDisplay(true);
      setAlertMessage({ message: "You must write something" });
      setTimeout(() => setDisplay(false), 1000);
    }
  }

  const AlertMessage = ({ message, variantName }) => (
    <Alert
      className={"w-52 absolute top-5 left-1/2 transform -translate-x-1/2"}
      variant={variantName || null}
    >
      <AlertTitle>Oops!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );

  useEffect(() => {
    const ShowMessage = () => {
      if (userTasks.length >= 6) {
        setDisplay(true);
        deleteUserTask(userTasks[userTasks.length - 1].id);
        setAlertMessage({
          message: "Complete a Task before adding another one",
          variantName: "destructive",
        });
        setTimeout(() => setDisplay(false), 1000);
      } else {
        return null;
      }
    };
    ShowMessage();
  }, [userTasks, display]);

  return (
    <>
      <NavBar />
      {display && (
        <AlertMessage
          message={alertMessage.message}
          variantName={alertMessage.variantName}
        />
      )}
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

          {/* Track tasks */}
          <h3>{`(${userTasks.length}/5)`}</h3>

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
