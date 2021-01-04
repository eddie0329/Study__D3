/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    2.4 - Adding SVGs with D3
 */

// const data = [25, 20, 10, 12, 15];

d3.csv("./js/ages.csv").then((data) => {
  data.forEach((d) => {
    d.age = Number(d.age);
  });
  console.log(data);
  const svg = d3
    .select("#chart-area")
    .append("svg")
    .attr("width", 400)
    .attr("height", 400);

  const circles = svg.selectAll("circle").data(data);

  circles
    .enter()
    .append("circle")
    .attr("cx", (d, i) => i * 60)
    .attr("cy", 250)
    .attr("r", (d) => d.age);
});
