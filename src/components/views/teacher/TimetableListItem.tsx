import clsxm from '@/lib/clsxm';

export default function TimetableListItem({
  subject,
}: {
  subject?: {
    name: string;
    subjectColor: string;
    time: string;
    textColor: string;
  };
}) {
  return (
    <div
      className={clsxm(
        'border rounded-md w-28 h-28 lg:h-36 lg:w-36 text-xs py-4 px-2 font-bold',
        subject?.textColor
      )}
    >
      {subject && (
        <div
          className={clsxm(
            'h-full w-full rounded-md flex gap-6 flex-col justify-center items-center p-2',
            subject.subjectColor
          )}
        >
          <div>{subject.name}</div>
          <div>{subject.time}</div>
        </div>
      )}
    </div>
  );
}
