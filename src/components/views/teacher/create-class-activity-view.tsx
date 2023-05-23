'use client';

import BaseAccordion from '@/components/accordions/BaseAccordion';
import TextArea from '@/components/input/TextArea';
import Input from '@/components/input/formInput';
import Select from '@/components/input/formSelect';

export default function CreateClassActivityView() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='text-2xl font-bold my-4'>Create Class Activity</div>
      <div className='grid grid-cols-2 gap-2'>
        <Select label='Type of Activity' options={[]} />
        <Select label='Format' options={[]} />
        <Select label='Due Date' options={[]} />
        <Select label='Time Limit' options={[]} />
      </div>
      <BaseAccordion
        title='Question 1'
        length={250}
        className='bg-[#EFF7F6] rounded-lg'
      >
        <div>
          <TextArea
            label=''
            name='question'
            placeholder='Input question here'
          />
          <div className='h-4' />
          <div className='grid grid-cols-2 gap-5'>
            {Array(4)
              .fill(0)
              .map((v, i) => (
                <Input key={i} label='' placeholder={`Option ${i + 1}`} />
              ))}
          </div>
        </div>
      </BaseAccordion>
      <BaseAccordion
        title='Question 2'
        length={250}
        className='bg-[#EFF7F6] rounded-lg'
      >
        <div>
          <TextArea
            label=''
            name='question'
            placeholder='Input question here'
          />
          <div className='h-4' />
          <div className='grid grid-cols-2 gap-5'>
            {Array(4)
              .fill(0)
              .map((v, i) => (
                <Input key={i} label='' placeholder={`Option ${i + 1}`} />
              ))}
          </div>
        </div>
      </BaseAccordion>
      <BaseAccordion
        title='Question 3'
        length={250}
        className='bg-[#EFF7F6] rounded-lg'
      >
        <div>
          <TextArea
            label=''
            name='question'
            placeholder='Input question here'
          />
          <div className='h-4' />
          <div className='grid grid-cols-2 gap-5'>
            {Array(4)
              .fill(0)
              .map((v, i) => (
                <Input key={i} label='' placeholder={`Option ${i + 1}`} />
              ))}
          </div>
        </div>
      </BaseAccordion>
    </div>
  );
}
