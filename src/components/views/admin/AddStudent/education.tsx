/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormSelect from '@/components/input/formSelectClass';
import { getFromLocalStorage } from '@/lib/helper';
import { useGetProfile } from '@/server/auth';
import { useGetInstituteClassArms } from '@/server/institution/class';

type Iprops = {
  register: any;
  errors: any;
};

const Education = ({ register, errors }: Iprops) => {
  const { data: institutionProfile } = useGetProfile();

  const institutionId: string = getFromLocalStorage('institutionId') ?? '';

  const currentSessionId = institutionProfile?.currentSession?.[0]?.id;
  const { data: allclasses } = useGetInstituteClassArms(
    institutionId,
    currentSessionId
  );
  // const { data: teachers } = useGetTeachersListByInstitution({
  //   instituteId: institutionId,
  // });

  // const [teachers, setteachers] = useState();
  // const getData = async () => {
  //   const d = await request.get('/v1/government/teachers/get-staffs', {
  //     withCredentials: true,
  //   });
  //   setteachers(d.data.data.data.data as any);
  // };
  // useEffect(() => {
  //   // getData();
  // }, [teachers]);
  // const { data: staffsList } = useGetTeachersList();
  // logger(staffsList);

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Educational Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 md:grid grid-cols-2 gap-6'>
        <div>
          <FormSelect
            label='Assign Class'
            name='class'
            options={allclasses?.data ?? []}
            register={register}
            validation={{
              required: 'Class is required',
            }}
            helper={
              errors?.class && {
                message: errors?.class?.message,
                type: 'danger',
              }
            }
          />
        </div>
        {/* <div>
          {teachers && (
            <FormSelectTeacher
              label='Class Teacher'
              name='teacher'
              options={teachers?.data ?? []}
              register={register}
              validation={{
                required: 'Teacher is required',
              }}
              helper={
                errors?.teacher && {
                  message: errors?.teacher?.message,
                  type: 'danger',
                }
              }
            />
          )}
        </div> */}
      </div>
    </section>
  );
};

export default Education;
