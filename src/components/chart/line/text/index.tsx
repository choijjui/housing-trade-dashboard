import React from 'react';
import styled from 'styled-components';

const Text = styled.text`
  fill: #434343;
  font-size: 14px;
  font-weight: bold;
  text-anchor: middle;

  > tspan {
    fill: #8f8f8f;
    font-size: 14px;
    font-weight: normal;
    text-anchor: middle;
  }
`;

function TextComp({ data, xScale }) {
  return (
    <g>
      {data.map(d => (
        <Text
          key={d.month}
          x={xScale(d.month) + xScale.bandwidth() / 2}
          y={163}
        >
          {d.month}
          <tspan x={xScale(d.month) + xScale.bandwidth() / 2} y="183">
            ({d.member}명)
          </tspan>
        </Text>
      ))}
    </g>
  );
}

export default TextComp;
