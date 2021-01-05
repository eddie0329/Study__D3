/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    3.2 - Linear scales
 */

const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };

const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;

const HEIGHT = 400 - MARGIN.TOP - MARGIN.RIGHT;

const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

const g = svg
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

d3.json("data/buildings.json").then((data) => {
  data.forEach((d) => {
    d.height = Number(d.height);
  });

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.height)])
    .range([0, HEIGHT]);

  const xAxisCall = d3.axisBottom(x);

  const yAxisCall = d3.axisTop(y);

  const rects = g.selectAll("rect").data(data);

  rects
    .enter()
    .append("rect")
    .attr("y", 0)
    .attr("x", (d, i) => x(d.name))
    .attr("width", 40)
    .attr("height", (d) => y(d.height))
    .attr("fill", "grey");
});

const x = d3.scaleLog().domain([300, 150000]).range([0, 400]).base(10);

console.log(x(500)); // 32.9

console.log(x.invert(32.9)); // 500

const timeScale = d3
  .scaleTime()
  .domain([new Date(2000, 0, 1), new Date(2001, 0, 1)])
  .range([0, 400]);

console.log(timeScale(new Date(2000, 7, 1))); // 232
console.log(timeScale.invert(232)); // Mon Jul 31 2000

const color = d3
  .scaleOrdinal()
  .domain(["AFRICA", "N.AMERICA", "EUROPE", "S.AMERICA", "ASIA"])
  // .range(d3.schemeCategory10);
  .range(["RED", "ORANGE", "YELLOW", "GREEN", "BLUE", "INDIGO", "GREY"]);

console.log(color("ASIA")); // BLUE

const band = d3
  .scaleBand()
  .domain(["AFRICA", "N.AMERICA", "EUROPE", "S.AMERICA", "ASIA"])
  .range([0, 400])
  .paddingInner(0.3)
  .paddingOuter(0.2);

console.log(band("ASIA")); // 329
console.log(band.bandwidth()); // 54
console.log(band("EDDIE")); // undefined

const data2 = [
  { grade: "A", value: 4 },
  { grade: "B", value: 3 },
  { grade: "C", value: 2 },
];

const min = d3.min(data2, (d) => d.value);
console.log("min", min); // 2

const max = d3.max(data2, (d) => d.value); // 4
console.log("max", max);

const extent = d3.extent(data2, (d) => d.value);
console.log("extent", extent); // [2, 4]
