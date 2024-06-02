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

  function handleEdit() {
    trackEditId(id);
    trackEditTask(taskName);
  }

  function moveToPastTrack(taskId) {
    const { taskName, id } = userTasks.find((task) => task.id === taskId);
    addPastTrack(taskName);
    deleteUserTask(id);
  }

  return (
    <div className="flex m-2 ring-2 p-2 rounded-lg w-96 ring-zinc-600">
      <div className="flex flex-1 items-center space-x-2">
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
