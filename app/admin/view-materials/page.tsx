'use client';

import SingleMaterial from '@/components/views/admin/SingleMaterial';

export default function Page() {
  return (
    <div>
      <SingleMaterial
        material={{
          description: 'This is the description',
          title: 'This is the title',
          documentPath: 'institute_materials/My Resume.pdf',
          pages: [],
        }}
      />
    </div>
  );
}
