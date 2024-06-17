import { useTaskStore } from "@/store/store";
import { Button } from "../button";

/* 
  Task should be showing the date where they were complete it
  fix only show 5 past task per sections, add pages to see past task
 */
export default function PastTask() {
  const { pastUserTask, deletePastTask, resetPastTask } = useTaskStore();

  return (
    <>
      <div className="flex justify-between">
        <h3>Past Task</h3>
        <Button onClick={() => resetPastTask()}>Clear all</Button>
      </div>

      {pastUserTask.map(({ taskName, id }) => (
        <div className="flex m-2 ring-2 p-2 rounded-lg ring-zinc-600">
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
