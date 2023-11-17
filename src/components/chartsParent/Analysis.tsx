import ChartWrapper from '@/components/charts/ChartWrapper';
import { ResponsiveLine } from '@nivo/line';
import { random } from 'lodash';

const d = [
  {
    id: 'value',
    color: '#E5A500',
    data: Array(200)
      .fill(0)
      .map((v, i) => ({ x: i, y: random(30, 40) })),
  },
];
const Analysis = ({ data }: { data?: typeof d }) => (
  <ChartWrapper className='bg-[#E6FFF7]' title='Analysis'>
    <div className='h-96'>

      <ResponsiveLine
        data={data ?? d}
        margin={{ top: 50, right: 40, bottom: 70, left: 50 }}
        curve='natural'
        enableArea
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
        enableGridX={false}
        enableGridY={false}
        yFormat=' >-.2f'
        axisTop={null}
        axisRight={null}
        axisBottom={null}
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
  </ChartWrapper>
);

export default Analysis;
