import { Checkbox } from "../checkbox";
import { Button } from "../button";
import { useTaskStore } from "@/store/store";

export default function CurrentTask({ taskName, id }) {
  const {
    deleteUserTask,
    trackEditTask,
    trackEditId,
    addPastTrack,
    userTasks,
  } = useTaskStore();

  /*

 Make a request to the backend for each update ?
*/

  function handleEdit() {
    trackEditId(id);
    trackEditTask(taskName);
  }

  /*
    Change---
    If task.completed === true; addPastTrack(taskName)
  */
  function moveToPastTrack(taskId) {
    const { taskName, id } = userTasks.find((task) => task.id === taskId);
    addPastTrack(taskName);
    deleteUserTask(id);
  }

  return (
    <div className="flex m-2 ring-2 p-2 rounded-lg  ring-zinc-600">
      <div className="flex flex-1 items-center w-52 space-x-2">
        <Checkbox id={id} onCheckedChange={() => moveToPastTrack(id)} />
        <label htmlFor={id}>{taskName}</label>
      </div>

      <Button className="flex-none" onClick={handleEdit}>
        Edit
      </Button>
      <Button variant="destructive" onClick={() => deleteUserTask(id)}>
        Delete
      </Button>
    </div>
  );
}
