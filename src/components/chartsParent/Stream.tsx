// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/stream
import { ResponsiveStream } from '@nivo/stream';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
  {
    Raoul: 97,
    Josiane: 95,
    Marcel: 46,
    René: 22,
    Paul: 97,
    Jacques: 84,
  },
  {
    Raoul: 32,
    Josiane: 62,
    Marcel: 131,
    René: 132,
    Paul: 160,
    Jacques: 137,
  },
  {
    Raoul: 43,
    Josiane: 51,
    Marcel: 88,
    René: 95,
    Paul: 117,
    Jacques: 91,
  },
  {
    Raoul: 26,
    Josiane: 68,
    Marcel: 182,
    René: 147,
    Paul: 115,
    Jacques: 134,
  },
  {
    Raoul: 92,
    Josiane: 139,
    Marcel: 70,
    René: 142,
    Paul: 49,
    Jacques: 39,
  },
  {
    Raoul: 51,
    Josiane: 150,
    Marcel: 92,
    René: 151,
    Paul: 67,
    Jacques: 170,
  },
  {
    Raoul: 193,
    Josiane: 84,
    Marcel: 139,
    René: 147,
    Paul: 143,
    Jacques: 168,
  },
  {
    Raoul: 185,
    Josiane: 175,
    Marcel: 136,
    René: 113,
    Paul: 136,
    Jacques: 62,
  },
  {
    Raoul: 43,
    Josiane: 140,
    Marcel: 98,
    René: 65,
    Paul: 127,
    Jacques: 162,
  },
];

const StreamChart = () => (
  <ResponsiveStream
    data={data}
    keys={['Raoul', 'Josiane', 'Marcel', 'René', 'Paul', 'Jacques']}
    // margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      // orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: '',
      legendOffset: 36,
    }}
    axisLeft={{
      // orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: '',
      legendOffset: -40,
    }}
    enableGridX={true}
    enableGridY={false}
    offsetType='silhouette'
    colors={{ scheme: 'nivo' }}
    fillOpacity={0.85}
    borderColor={{ theme: 'background' }}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: '#2c998f',
        size: 4,
        padding: 2,
        stagger: true,
      },
      {
        id: 'squares',
        type: 'patternSquares',
        background: 'inherit',
        color: '#e4c912',
        size: 6,
        padding: 2,
        stagger: true,
      },
    ]}
    fill={[
      {
        match: {
          id: 'Paul',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'Marcel',
        },
        id: 'squares',
      },
    ]}
    dotSize={8}
    dotColor={{ from: 'color' }}
    dotBorderWidth={2}
    dotBorderColor={{
      from: 'color',
      modifiers: [['darker', 0.7]],
    }}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        translateX: 100,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: '#999999',
        symbolSize: 12,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000000',
            },
          },
        ],
      },
    ]}
  />
);

export default StreamChart;
