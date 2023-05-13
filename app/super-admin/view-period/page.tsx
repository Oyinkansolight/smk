'use client';

import Button from '@/components/buttons/Button';
import Success from '@/components/modal/Success';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ViewPeriod = () => {
  const router = useRouter();
  const [isOpen] = useState(false);
  return (
    <section className='md:px-[60px] px-5 py-6'>
      <Link href='/super-admin'>
        <div className='flex items-center space-x-4'>
          <Image
            src='/svg/back.svg'
            width={10}
            height={10}
            alt='back'
            className='h-4 w-4'
          />
          <h3 className='text-[10px] font-medium'>Back</h3>
        </div>
      </Link>

      <div className='flex items-center'>
        <h1 className='mt-5 mb-6 text-2xl font-bold'>
          First Term Primary 1 Mathematics Curriculum - Period 1
        </h1>
        <div className='flex-1' />
        <Button
          onClick={() => {
            router.push('/super-admin/edit-period');
          }}
          variant='outline'
        >
          Edit
        </Button>
      </div>

      <div className='bg-white p-8 rounded-md mt-4'>
        <h2 className='text-xl font-bold mb-10'>Summary</h2>

        <div className='grid grid-cols-2  items-center'>
          <TitleLabel title='Week' label='Week 1' />
          <TitleLabel title='Period' label='Period 1' />
        </div>
        <div className='my-5' />
        <div className='grid grid-cols-2  items-center'>
          <TitleLabel title='Subject' label='Mathematics' />
        </div>
        <div className='h-px my-5 bg-black' />
        <div className='grid grid-cols-2  items-center'>
          <TitleLabel title='Title' label='Primary 1' />
          <TitleLabel
            title='Teaching Method'
            label='Mathematics, English, Yoruba'
          />
        </div>
        <div className='my-5' />
        <div className='grid grid-cols-2  items-center'>
          <TitleLabel title='Instructional Materials' label='Primary 1' />
          <TitleLabel
            title='Teacher Preparation for the lesson'
            label='Mathematics, English, Yoruba'
          />
        </div>
        <div className='h-px my-5 bg-black' />
        <StepRender
          stepNo={1}
          time={45}
          stepName='Identification of Prior Ideas'
          ita='Primary 1'
          core='Mathematics, English, Yoruba'
        />
        <div className='h-px my-5 bg-black' />
        <StepRender
          stepNo={2}
          time={45}
          stepName='Identification of Prior Ideas'
          ita='Primary 1'
          core='Mathematics, English, Yoruba'
        />
        <div className='h-px my-5 bg-black' />
        <StepRender
          stepNo={3}
          time={45}
          stepName='Identification of Prior Ideas'
          ita='Primary 1'
          core='Mathematics, English, Yoruba'
        />
        <div className='h-px my-5 bg-black' />
        <StepRender
          stepNo={4}
          time={45}
          stepName='Identification of Prior Ideas'
          ita='Primary 1'
          core='Mathematics, English, Yoruba'
        />
        <div className='h-px my-5 bg-black' />
        <StepRender
          stepNo={5}
          time={45}
          stepName='Identification of Prior Ideas'
          ita='Primary 1'
          core='Mathematics, English, Yoruba'
        />
        <div className='h-px my-5 bg-black' />
        <div className='flex flex-col gap-8'>
          <TitleLabelLink
            title='Board Summary'
            label={
              <span>
                FEMALE It is made up of various organs, tissues and cells that
                entrance production and fertilization of eggs.it is made up of
                the following:
                <br /> 1. Ovary
                <br /> 2. Fallopian funnel
                <br /> 3. Fallopian tube/oviduct
                <br /> 4. Uterus/womb
                <br /> 5. Cervix
                <br /> 6. Vagina and vulvar
                <br />
              </span>
            }
            link='Image attached here'
          />
          <TitleLabelLink
            title='Ovaries:'
            label={
              <span>
                There are two Ovaries at the lower abdominal cavity of a female
                human being. Each of them produce egg every month. They
                alternate their production. Each of them is capable of producing
                about 500,000 eggs, during their active period (active period
                starts in puberty and end in menopause. Each ovary release egg
                once in every 14th day of the 29 days of the menstrual cycle.
                Premature eggs are called primary oocytes while mature eggs are
                called secondary oocytes.
              </span>
            }
            link='Video attached here'
          />

          <TitleLabelLink
            title='Fallopian Funnel:'
            label={
              <span>
                it has a funnel shape and it is ciliated, it covers the surface
                of the two ovaries. It sweeps the released egg from the ovary to
                the oviduct (ovulation).
              </span>
            }
            link='Image attached here'
          />
          <TitleLabelLink
            title='Oviduct/fallopian tube:'
            label={
              <span>
                Oviduct is cylindrical it lies between the fallopian funnel and
                the uterus. In wrong pregnancy, Implantation of the embryo can
                take place in the oviduct.
              </span>
            }
            link='Image attached here'
          />
          <TitleLabelLink
            title='Uterus/womb:'
            label={
              <span>
                It is pear shape it is also muscular and it receives the embryo
                (developed zygote) for implantation. The wall of the uterus is
                surrounded by a delicate tissue called uterine which is richly
                supplied with blood capillaries. It also the extra uterine
                (endometrium) must be thickened under the influence of the
                hormone called progesterone. Progesterone also can also stop
                ovulation immediately after fertilization.
              </span>
            }
            link='Image attached here'
          />
          <TitleLabelLink
            title='Cervix:'
            label={
              <span>
                It is a ring of elastic muscles that separates the uterus from
                the vaginal. During parturition a posterior pituitary hormone
                called oxytocin brings about contraction of the uterus and
                cervix. The cervix becomes dilate to allow child birth. Vagina:
                it is canal that lies between the vulva and the cervix. It is
                deep as 7cm to 10cm in the adult human being. It receives semen
                during copulation. It can also help in child birth.
              </span>
            }
            link='Image attached here'
          />
          <TitleLabelLink
            title='Vulva:'
            label={
              <span>
                it is the sum total of the external features of female
                reproductive system. It includes. 1. One large fold of skin
                called labia majora (plura-majora) 2. One small fold of skin
                called labia minora (plural-minora) inside the labia majora 3. A
                penis like small urethra less sensitive organ called clitoris.
                It can also be erect when stimulated because it has several
                erectile muscles. Note that certain fluid that is released from
                tiny openings in the vulva is not sperm but it is secreted to
                make coitus pleasurable as it wets the vulva to make coitus
                pleasurable as it wets the vulva and reduce friction.
              </span>
            }
            link='Image attached here'
          />
        </div>
      </div>
      {isOpen && (
        <Success
          title='School created successfully'
          description='Login details would be generated and sent to the school’s official email.'
          link='/super-admin/all-school'
          textLink='Manage School'
        />
      )}
    </section>
  );
};

function StepRender({
  stepNo,
  stepName,
  time,
  ita,
  core,
}: {
  stepNo: number;
  time: number;
  stepName: string;
  ita: string;
  core: string;
}) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-2  items-center'>
        <TitleLabel title={`Step ${stepNo}`} label={stepName} />
        <TitleLabel title='Time' label={`${time} Minutes`} />
      </div>
      <div className='grid grid-cols-2  items-center'>
        <TitleLabel title='Instructional Teaching Activity' label={ita} />
        <TitleLabel title='Core Skills' label={core} />
      </div>
    </div>
  );
}

function TitleLabel({ title, label }: { title: string; label: string }) {
  return (
    <div className='flex flex-col'>
      <div className='text-xs font-medium'>{title}</div>
      <div>{label}</div>
    </div>
  );
}

function TitleLabelLink({
  title,
  label,
  link,
}: {
  title: string;
  label: JSX.Element;
  link: string;
}) {
  return (
    <div className='flex flex-col'>
      <div className='font-bold'>{title}</div>
      <div>{label}</div>
      <div className='text-[#007AFF] font-bold'>{link}</div>
    </div>
  );
}

export default ViewPeriod;
