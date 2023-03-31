import TaskAccordion from '@/components/accordions/TaskAccordion';

export default function TaskListView() {
  return (
    <div>
      {Array(5)
        .fill(0)
        .map((v, i) => {
          return (
            <TaskAccordion
              taskName={`Class ${i}`}
              lessons={[]}
              nextClass={new Date()}
              endDate={new Date()}
              key={i}
            />
          );
        })}
    </div>
  );
}
