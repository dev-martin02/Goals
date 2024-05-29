import { useTaskStore } from "@/store/store";
import { Input } from "../input";
import { Button } from "../button";

export default function EditedTask() {
  const {
    trackEditTask,
    updateTask,
    editedTaskId,
    editedTaskName,
    trackEditId,
  } = useTaskStore();

  function handleCancel() {
    trackEditId("");
    console.log(editedTaskId);
  }
  return (
    <>
      <Input
        type="text"
        value={editedTaskName}
        onChange={(e) => trackEditTask(e.target.value)}
      />
      <Button
        onClick={() => {
          updateTask(editedTaskId);
          trackEditId("");
        }}
      >
        Update
      </Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </>
  );
}
