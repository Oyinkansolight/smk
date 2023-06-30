import { ResponsiveBar } from '@nivo/bar';


const d = [
  {
    gender: 'Male',
    value: 429386,
    valueColor: '#0C4AA7',
  },
  {
    gender: 'Female',
    value: 500000,
    valueColor: '#AA0DAD',
  },
];

const AttendanceTracker = ({ data }: { data?: typeof d }) => (
  <div className='h-[35rem]'>
    <ResponsiveBar
      data={data ?? d}
      enableGridY={false}
      indexBy='gender'
      margin={{ top: 0, right: 20, bottom: 100, left: 60 }}
      padding={0.6}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={(t) => {
        return (t.data[`${t.id}Color` as keyof typeof t.data] as string) ?? '';
      }}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor='#ffffff'
      legends={[
        {
          dataFrom: 'indexes',
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 70,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role='application'
      ariaLabel='Nivo bar chart demo'
      barAriaLabel={(e) =>
        e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
      }
    />
  </div>
);

export default AttendanceTracker;