import React from 'react';
import * as d3 from 'd3';

type TLine = {
  month: string;
  value: number;
  member: number;
};

interface Props {
  xScale: d3.ScaleBand<string>;
  yScale: d3.ScaleLinear<number, number, never>;
  data: TLine[];
}
function Line({ data, xScale, yScale }: Props) {
  const line = d3
    .line<TLine>()
    .x(d => xScale(d.month) + xScale.bandwidth() / 2)
    .y(d => yScale(d.value));

  return (
    <>
      <path
        fill="none"
        strokeWidth={2}
        stroke="#8782ea"
        d={line(data)}
      />

      {data.map(d => (
        <g key={d.month}>
          <circle
            r={5}
            fill="#8782ea"
            cx={xScale(d.month) + xScale.bandwidth() / 2}
            cy={yScale(d.value)}
          />
          {d.value > 1 && (
            <text
              x={xScale(d.month) + xScale.bandwidth() / 2}
              y={yScale(d.value) + 20}
              fill="#8782ea"
              fontSize="14px"
              fontWeight="bold"
              textAnchor="middle"
            >
              {d.value}
            </text>
          )}
        </g>
      ))}
    </>
  )
}

export default Line;
