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
        'border rounded-md h-36 w-36  text-xs py-4 px-2 font-bold',
        subject?.textColor
      )}
    >
      {subject && (
        <div
          className={clsxm(
            'h-full w-full rounded-md flex gap-6 flex-col justify-center items-center',
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
