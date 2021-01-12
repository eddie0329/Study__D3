/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

// true === profit | false === revenue
let flag = true;

const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

// TRANSITION
const t = d3.transition().duration(1500);

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
const x = d3.scaleBand().range([0, WIDTH]).paddingInner(0.3).paddingOuter(0.2);

// CREATE Y SCALE
const y = d3.scaleLinear().range([HEIGHT, 0]);

// X-AXIS GROUP
const xAxisGroup = g.append("g").attr("transform", `translate(0, ${HEIGHT})`);

// Y-AXIS GROUP
const yAxisGroup = g.append("g");

// X-LABEL
const xLabelGroup = g
  .append("text")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 50)
  .attr("text-anchor", "middle")
  .attr("font-size", "20px")
  .text("Month");

// Y-LABEL
const yLabelGroup = g
  .append("text")
  .attr("x", -(HEIGHT / 2))
  .attr("y", -60)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .attr("font-size", "20px")
  .text("Revenue ($)");

// UPDATE FUNCTION
const update = (data) => {
  const value = flag ? "profit" : "revenue";
  x.domain(data.map((d) => d.month));
  y.domain([0, d3.max(data, (d) => d[value])]);

  // CREATE X-AXIS CALL
  const xAxisCall = d3.axisBottom(x);
  xAxisGroup.transition(t).call(xAxisCall);

  // CREATE Y-AXIS CALL
  const yAxisCall = d3.axisLeft(y).tickFormat((d) => `$${d}`);
  yAxisGroup.transition(t).call(yAxisCall);

  // DATA JOIN
  const rects = g.selectAll("rect").data(data, (d) => d.month);

  // EXIT
  rects.exit().remove();

  // UPDATE
  // rects
  //   .transition(t)
  //   .attr("x", (d) => x(d.month))
  //   .attr("y", (d) => y(d[value]))
  //   .attr("width", 40)
  //   .attr("height", (d) => HEIGHT - y(d[value]));

  yLabelGroup.transition(t).text(flag ? "Profit ($)" : "Revenue ($)");

  // ENTER
  rects
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.month))
    .attr("y", y(0))
    .attr("width", x.bandwidth)
    .attr("height", 0)
    .merge(rects)
    .transition(t)
    .attr("x", (d) => x(d.month))
    .attr("y", (d) => y(d[value]))
    .attr("width", x.bandwidth)
    .attr("height", (d) => HEIGHT - y(d[value]))
    .attr("fill", "gray");
};

d3.csv("data/revenues.csv").then((data) => {
  // CONVERT DATA REVENUE TO NUMBER
  data.forEach((d) => {
    d.revenue = Number(d.revenue);
    d.profit = Number(d.profit);
  });

  d3.interval(() => {
    flag = !flag;
    update(data);
  }, 2000);
  update(data);
});
