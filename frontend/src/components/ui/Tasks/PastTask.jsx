import { useTaskStore } from "@/store/store";

/* 
  Task should be showing the date where they were complete it
  Fix bug of adding a task to pastTask array for every change in the checkbox
  fix only show 5 past task per sections, add pages to see past task
  */
export default function PastTask() {
  const { pastUserTask, deletePastTask, resetPastTask } = useTaskStore();

  return (
    <>
      <button onClick={() => resetPastTask()}>Reset all</button>
      {pastUserTask.map(({ taskName, id }) => (
        <div className="flex m-2 ring-2 p-2 rounded-lg w-96 ring-zinc-600">
          <p
            className="text-sm text-muted-foreground w-96"
            onClick={() => deletePastTask(id)}
          >
            {taskName}
          </p>
        </div>
      ))}
    </>
  );
}
