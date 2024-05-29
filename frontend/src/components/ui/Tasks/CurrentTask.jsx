import { Checkbox } from "../checkbox";
import { Button } from "../button";
import { useTaskStore } from "@/store/store";

export default function CurrentTask({ taskName, id }) {
  const { deleteUserTask, trackEditTask, trackEditId, addPastTrack } =
    useTaskStore();

  function handleEdit() {
    trackEditId(id);
    trackEditTask(taskName);
  }

  return (
    <div className="flex m-2 ring-2 p-2 rounded-lg w-96 ring-zinc-600">
      <div className="flex flex-1 items-center space-x-2">
        <Checkbox id="task" onCheckedChange={() => addPastTrack(taskName)} />
        <label htmlFor="task">{taskName}</label>
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
