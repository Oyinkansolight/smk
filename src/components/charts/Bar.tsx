// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

// const data = [
//   {
//     "Day": "M",
//     "M": 43,
//     "MColor": "hsl(265, 100%, 60%)",
//     "T": 2,
//     "TColor": "hsl(265, 100%, 60%)",
//     "W": 2,
//     "WColor": "hsl(265, 100%, 60%)",
//     "TH": 2,
//     "THColor": "hsl(265, 100%, 60%)",
//     "F": 2,
//     "FColor": "hsl(265, 100%, 60%)",
//   }
// ];

// const BarChart = () => (
//   <ResponsiveBar
//     data={data}
//     keys={[
//       'M',
//       'T',
//       'W',
//       'TH',
//       'F',
//     ]}
//     indexBy="day"
//     margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//     padding={0.3}
//     valueScale={{ type: 'linear' }}
//     indexScale={{ type: 'band', round: true }}
//     colors={{ scheme: 'nivo' }}
//     defs={[
//       {
//         id: 'dots',
//         type: 'patternDots',
//         background: 'inherit',
//         color: '#38bcb2',
//         size: 4,
//         padding: 1,
//         stagger: true
//       },
//       {
//         id: 'lines',
//         type: 'patternLines',
//         background: 'inherit',
//         color: '#eed312',
//         rotation: -45,
//         lineWidth: 6,
//         spacing: 10
//       }
//     ]}
//     fill={[
//       {
//         match: {
//           id: 'fries'
//         },
//         id: 'dots'
//       },
//       {
//         match: {
//           id: 'sandwich'
//         },
//         id: 'lines'
//       }
//     ]}
//     borderColor={{
//       from: 'color',
//       modifiers: [
//         [
//           'darker',
//           1.6
//         ]
//       ]
//     }}
//     axisTop={null}
//     axisRight={null}
//     axisBottom={{
//       tickSize: 5,
//       tickPadding: 5,
//       tickRotation: 0,
//       legend: 'day',
//       legendPosition: 'middle',
//       legendOffset: 32
//     }}
//     axisLeft={{
//       tickSize: 5,
//       tickPadding: 5,
//       tickRotation: 0,
//       legend: 'food',
//       legendPosition: 'middle',
//       legendOffset: -40
//     }}
//     labelSkipWidth={12}
//     labelSkipHeight={12}
//     labelTextColor={{
//       from: 'color',
//       modifiers: [
//         [
//           'darker',
//           1.6
//         ]
//       ]
//     }}
//     legends={[
//       {
//         dataFrom: 'keys',
//         anchor: 'bottom-right',
//         direction: 'column',
//         justify: false,
//         translateX: 120,
//         translateY: 0,
//         itemsSpacing: 2,
//         itemWidth: 100,
//         itemHeight: 20,
//         itemDirection: 'left-to-right',
//         itemOpacity: 0.85,
//         symbolSize: 20,
//         effects: [
//           {
//             on: 'hover',
//             style: {
//               itemOpacity: 1
//             }
//           }
//         ]
//       }
//     ]}
//     role="application"
//     ariaLabel="Nivo bar chart demo"
//     barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in day: " + e.indexValue }}
//   />
// )

const data = [
  {
    day: 'M',
    days: 59,
  },
  {
    day: 'T',
    days: 61,
  },
  {
    day: 'W',
    days: 55,
  },
  {
    day: 'TH',
    days: 78,
  },
  {
    day: 'F',
    days: 71,
  },
];

const BarChart = () => {
  return (
    <div className='h-80'>
      <ResponsiveBar
      data={data}
      keys={['days']}
      indexBy='day'
      margin={{ top: 0, right: 30, bottom: 30, left: 30 }}
      padding={0.4}
      valueScale={{ type: 'linear' }}
      colors='#7F0CA7'
      animate={false}
      enableLabel={false}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: +1,
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 25,
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
    />
    </div>
  );
};

export default BarChart;
