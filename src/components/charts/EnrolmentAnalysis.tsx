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

const EnrolmentAnalysis = ({ data, instituteIndex }) => {
  const secondaryLegendName = data?.SECONDARY?.[0]?.term?.startDate.slice(0, 4)
    ? 'SECONDARY '
    : // data?.SECONDARY?.[0]?.term?.startDate.slice(0, 4) +
      // '/' +
      // data.SECONDARY?.[2]?.term?.endDate.slice(0, 4)
      'SECONDARY';
  const primaryLegendName = data?.PRIMARY?.[0]?.term?.startDate.slice(0, 4)
    ? 'PRIMARY ' +
      data?.PRIMARY?.[0]?.term?.startDate.slice(0, 4) +
      '/' +
      data.PRIMARY?.[2]?.term?.endDate.slice(0, 4)
    : 'PRIMARY';
  const tertiaryLegendName = data?.TERTIARY?.[0]?.term?.startDate.slice(0, 4)
    ? 'TERTIARY ' +
      data?.TERTIARY?.[0]?.term?.startDate.slice(0, 4) +
      '/' +
      data.TERTIARY?.[2]?.term?.endDate.slice(0, 4)
    : 'TERTIARY';
  const eccdeLegendName = data?.ECCDE?.[0]?.term?.startDate.slice(0, 4)
    ? 'ECCDE ' +
      data?.ECCDE?.[0]?.term?.startDate.slice(0, 4) +
      '/' +
      data.ECCDE?.[2]?.term?.endDate.slice(0, 4)
    : 'ECCDE';
  const btvetLegendName = data?.BTVET?.[0]?.term?.startDate.slice(0, 4)
    ? 'BTVET ' +
      data?.BTVET?.[0]?.term?.startDate.slice(0, 4) +
      '/' +
      data.BTVET?.[2]?.term?.endDate.slice(0, 4)
    : 'BTVET';
  const tvetLegendName = data?.TVET?.[0]?.term?.startDate.slice(0, 4)
    ? 'TVET ' +
      data?.TVET?.[0]?.term?.startDate.slice(0, 4) +
      '/' +
      data.TVET?.[2]?.term?.endDate.slice(0, 4)
    : 'TVET';

  const parsedData = [
    //* SECONDARY
    {
      id: secondaryLegendName,
      color: 'hsl(176, 100%, 40%)',
      data: [
        {
          x: '1st Term',
          y: data?.SECONDARY?.[0]?.enrollmentCount ?? 0,
        },
        {
          x: '2nd Term',
          y: data?.SECONDARY?.[1]?.enrollmentCount ?? 0,
        },
        {
          x: '3rd Term',
          y: data?.SECONDARY?.[2]?.enrollmentCount ?? 0,
        },
      ],
    },
    //* PRIMARY
    {
      id: primaryLegendName,
      color: 'hsla(15, 100%, 60%, 1)',
      data: [
        {
          x: '1st Term',
          y: data?.PRIMARY?.[0]?.enrollmentCount ?? 0,
        },
        {
          x: '2nd Term',
          y: data?.PRIMARY?.[1]?.enrollmentCount ?? 0,
        },
        {
          x: '3rd Term',
          y: data?.PRIMARY?.[2]?.enrollmentCount ?? 0,
        },
      ],
    },
    //* TERTIARY
    {
      id: tertiaryLegendName,
      color: 'hsla(126, 100%, 60%, 1)',
      data: [
        {
          x: '1st Term',
          y: data?.TERTIARY?.[0]?.enrollmentCount ?? 0,
        },
        {
          x: '2nd Term',
          y: data?.TERTIARY?.[1]?.enrollmentCount ?? 0,
        },
        {
          x: '3rd Term',
          y: data?.TERTIARY?.[2]?.enrollmentCount ?? 0,
        },
      ],
    },
    //* ECCDE
    {
      id: eccdeLegendName,
      color: 'hsla(226, 100%, 60%, 1)',
      data: [
        {
          x: '1st Term',
          y: data?.ECCDE?.[0]?.enrollmentCount ?? 0,
        },
        {
          x: '2nd Term',
          y: data?.ECCDE?.[1]?.enrollmentCount ?? 0,
        },
        {
          x: '3rd Term',
          y: data?.ECCDE?.[2]?.enrollmentCount ?? 0,
        },
      ],
    },
    //* BTVET
    {
      id: btvetLegendName,
      color: 'hsla(206, 100%, 60%, 1)',
      data: [
        {
          x: '1st Term',
          y: data?.BTVET?.[0]?.enrollmentCount ?? 0,
        },
        {
          x: '2nd Term',
          y: data?.BTVET?.[1]?.enrollmentCount ?? 0,
        },
        {
          x: '3rd Term',
          y: data?.BTVET?.[2]?.enrollmentCount ?? 0,
        },
      ],
    },
    //* TVET
    {
      id: tvetLegendName,
      color: 'hsla(156, 100%, 60%, 1)',
      data: [
        {
          x: '1st Term',
          y: data?.TVET?.[0]?.enrollmentCount ?? 0,
        },
        {
          x: '2nd Term',
          y: data?.TVET?.[1]?.enrollmentCount ?? 0,
        },
        {
          x: '3rd Term',
          y: data?.TVET?.[2]?.enrollmentCount ?? 0,
        },
      ],
    },
  ];

  return (
    <div className='h-96'>
      <ResponsiveLine
        data={
          typeof instituteIndex === 'number'
            ? [parsedData[instituteIndex]]
            : parsedData
        }
        margin={{ top: 130, right: 40, bottom: 70, left: 50 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          reverse: false,
        }}
        colors={(p: (typeof parsedData)[number]) => {
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
            anchor: 'top-left',
            direction: 'column',
            justify: false,
            translateX: -50,
            translateY: -130,
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
  );
};

export default EnrolmentAnalysis;
