import React, { useEffect, useRef } from 'react';
import { axisLeft } from 'd3-axis';
import { select as d3Select } from 'd3-selection';

interface Props {
  yScale: d3.ScaleLinear<number, number, never>;
  width: number;
  margin: any
}
function Axis({ yScale, width, margin }: Props) {
  const yAxis = useRef(null);

  useEffect(() => {
    d3Select(yAxis.current).call(
      axisLeft(yScale)
        .tickValues([0, 1, 2, 3, 4, 5])
        .tickSize(-width)
        // .tickFormat(function (d, i) { return '' })
    ).call((g) => g.select('.domain').remove());

    d3Select(yAxis.current).selectAll(".tick line").attr("stroke", "#ececec");

  }, [yAxis.current])

  return (
    <g
      className="yAxis"
      ref={yAxis}
      transform={`translate(${margin.left}, 0)`}
    />
  )
}

export default Axis;
