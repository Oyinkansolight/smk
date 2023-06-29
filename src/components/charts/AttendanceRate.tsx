import { ResponsivePie } from '@nivo/pie';

const d = [
  {
    id: 'present',
    label: 'Present',
    value: 57.31,
    color: '#2DCE89',
  },
  {
    id: 'late',
    label: 'Late',
    value: 27.37,
    color: '#EB973E',
  },
  {
    id: 'absent',
    label: 'Absent',
    value: 15.32,
    color: '#E5002B',
  },
];

const AttendanceRate = ({ data }: { data?: typeof d }) => (
  // <ChartWrapper className='bg-[#EDF5F2]' title='Attendance Rate'>
  <div className='flex gap-1 justify-center'>
    <div className='flex flex-col items-center text-center'>
      <div className=' text-2xl'>Staff Attendance</div>
      <div className='h-80 w-80'>
        <ResponsivePie
          data={data ?? d}
          margin={{ top: 40, right: 5, bottom: 80, left: 80 }}
          colors={(p) => p.data.color}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          activeOuterRadiusOffset={8}
          borderWidth={1}
          valueFormat={(v) => `${v}%`}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor='#000000'
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor='#ffffff'
          enableArcLinkLabels={false}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 20,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
    <div className='flex flex-col items-center text-center'>
      <div className=' text-2xl'>Student Attendance</div>
      <div className='h-80 w-80'>
        <ResponsivePie
          data={data ?? d}
          margin={{ top: 40, right: 80, bottom: 80, left: 5 }}
          colors={(p) => p.data.color}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          activeOuterRadiusOffset={8}
          borderWidth={1}
          valueFormat={(v) => `${v}%`}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor='#000000'
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor='#ffffff'
          enableArcLinkLabels={false}
        // legends={[
        //   {
        //     anchor: 'bottom',
        //     direction: 'row',
        //     justify: false,
        //     translateX: 0,
        //     translateY: 56,
        //     itemsSpacing: 0,
        //     itemWidth: 100,
        //     itemHeight: 18,
        //     itemTextColor: '#999',
        //     itemDirection: 'left-to-right',
        //     itemOpacity: 1,
        //     symbolSize: 18,
        //     symbolShape: 'circle',
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemTextColor: '#000',
        //         },
        //       },
        //     ],
        //   },
        // ]}
        />
      </div>
    </div>
  </div>
  // </ChartWrapper>
);

export default AttendanceRate;
