/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Dragdrop from '@/components/input/dragdrop';
import FormSelect from '@/components/input/formSelect';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

type Iprops = {
  register: any;
  errors: any;
  imageName: string;
  setImageName: (v: string | undefined) => void;
  setImageData: (v: any) => void;

  imageName1: string;
  setImageName1: (v: string | undefined) => void;
  setImageData1: (v: any) => void;

  imageName2: string;
  setImageName2: (v: string | undefined) => void;
  setImageData2: (v: any) => void;
};
const Document = ({
  register,
  errors,
  imageName,
  setImageData,
  setImageName,

  imageName1,
  setImageData1,
  setImageName1,

  imageName2,
  setImageData2,
  setImageName2,
}: Iprops) => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Upload Documents</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <Dragdrop
          setImageName={setImageName}
          imageName={imageName}
          label='Upload ID Card Image *'
          name='idCardImage'
          setImageData={setImageData}
          register={register}
          // validation={{
          //   required: 'ID Card is required',
          // }}
          helper={
            errors?.idCardImage && {
              message: errors?.idCardImage?.message,
              type: 'danger',
            }
          }
        />
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormSelect
            label='Document Type'
            name='firstDocumentType'
            options={['First Degree', 'Other Certification']}
            register={register}
            validation={{
              required: 'Document is required',
            }}
            helper={
              errors?.firstDocumentType && {
                message: errors?.firstDocumentType?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <Dragdrop
            setImageName={setImageName1}
            imageName={imageName1}
            name='firstUpload'
            label='Upload*'
            setImageData={setImageData1}
            register={register}
            // validation={{
            //   required: 'Image is required',
            // }}
            helper={
              errors?.firstUpload && {
                message: errors?.firstUpload?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormSelect
            label='Document Type'
            name='secondDocumentType'
            options={['First Degree', 'Other Certification']}
            register={register}
            validation={{
              required: 'Document is required',
            }}
            helper={
              errors?.secondDocumentType && {
                message: errors?.secondDocumentType?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <Dragdrop
            setImageName={setImageName2}
            imageName={imageName2}
            name='secondUpload'
            label='Upload*'
            setImageData={setImageData2}
            register={register}
            // validation={{
            //   required: 'Image is required',
            // }}
            helper={
              errors?.secondUpload && {
                message: errors?.secondUpload?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Document;
