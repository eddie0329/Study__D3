/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    2.8 - Activity: Your first visualization!
 */

d3.json("data/buildings.json").then((data) => {
  // Parsing the number
  data.forEach((d) => {
    d.height = Number(d.height);
  });

  // creating svg
  const svg = d3
    .select("#chart-area")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

  // data join
  const rects = svg.selectAll("rect").data(data);

  // define each rects
  rects
    .enter()
    .append("rect")
    .attr("x", (d, i) => 40 * i)
    .attr("y", 10)
    .attr("width", 30)
    .attr("height", (d) => d.height)
    .attr("fill", "gray");
});
