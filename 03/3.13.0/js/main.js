/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 };

const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

d3.csv("data/revenues.csv").then((data) => {
  // CONVERT DATA REVENUE TO NUMBER
  data.forEach((d) => {
    d.revenue = Number(d.revenue);
  });

  // CREATE SVG
  const svg = d3
    .select("#chart-area")
    .append("svg")
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

  // APPEND G FOR MARGIN
  const g = svg
    .append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

  // CREATE X SCALE
  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.month))
    .range([0, WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.2);

  // CREATE Y SCALE
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.revenue)])
    .range([HEIGHT, 0]);

  // CREATE X-AXIS CALL
  const xAxisCall = d3.axisBottom(x);

  // APPEND X-AXIS
  g.append("g").call(xAxisCall).attr("transform", `translate(0, ${HEIGHT})`);

  // CREATE Y-AXIS CALL
  const yAxisCall = d3.axisLeft(y).tickFormat((d) => `$${d}`);

  // APPEND Y-AXIS
  g.append("g").call(yAxisCall);

  // CREATE X LABEL
  g.append("text")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT + 50)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .text("Month");

  // CREATE Y LABEL
  g.append("text")
    .attr("x", -(HEIGHT / 2))
    .attr("y", -60)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .text("Revenue");

  // CREATE BAR
  const revenues = g.selectAll("rect").data(data);
  revenues
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.month))
    .attr("y", (d) => y(d.revenue))
    .attr("width", 40)
    .attr("height", (d) => HEIGHT - y(d.revenue))
    .attr("fill", "gray");
});
