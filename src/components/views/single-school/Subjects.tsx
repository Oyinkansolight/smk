/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyView from '@/components/misc/EmptyView';

export default function TaskListView() {
  const schoolSubjects: any[] = [];

  return (
    <div className='flex flex-col space-y-6'>
      <div className='layout h-full'>
        <div className='flex flex-col bg-white h-screen overflow-y-auto'>
          <div className='w-full'>
            <div className='font-bold py-8 px-4 md:text-3xl text-xl'>
              Subjects
              <div className='h-px bg-gray-500 mt-[22px] mb-4 flex flex-wrap ' />
              {!schoolSubjects ||
                (schoolSubjects.length === 0 && (
                  <EmptyView
                    label='No subject for this institution'
                    useStandardHeight
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
