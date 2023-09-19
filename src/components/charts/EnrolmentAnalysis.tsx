import { ResponsiveLine } from '@nivo/line';

const d = [
  {
    id: '2020/2021',
    color: 'hsl(176, 100%, 40%)',
    data: [
      {
        x: '1st Term',
        y: 19000,
      },
      {
        x: '2nd Term',
        y: 12000,
      },
      {
        x: '3rd Term',
        y: 14000,
      },
    ],
  },
  {
    id: '2021/2022',
    color: 'hsla(15, 100%, 60%, 1)',
    data: [
      {
        x: '1st Term',
        y: 20000,
      },
      {
        x: '2nd Term',
        y: 15000,
      },
      {
        x: '3rd Term',
        y: 20500,
      },
    ],
  },
  {
    id: '2022/2023',
    color: 'hsla(226, 100%, 60%, 1)',
    data: [
      {
        x: '1st Term',
        y: 35000,
      },
      {
        x: '2nd Term',
        y: 35200,
      },
      {
        x: '3rd Term',
        y: 30000,
      },
    ],
  },
];
const EnrolmentAnalysis = ({ data }: { data?: typeof d }) => (
  // <ChartWrapper className='bg-[#FFF6EC]' title='Enrolment Analysis'>
  <div className='h-96'>

    <ResponsiveLine
      data={data ?? d}
      margin={{ top: 50, right: 40, bottom: 70, left: 50 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 0,
        max: 'auto',
        reverse: false,
      }}
      colors={(p: (typeof d)[number]) => {
        return p.color;
      }}
      yFormat=' >-.2f'
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'School Term',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Population',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      enablePoints={false}
      pointSize={10}
      pointColor={{ from: 'color', modifiers: [] }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 70,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  </div>
  // </ChartWrapper>
);

export default EnrolmentAnalysis;
