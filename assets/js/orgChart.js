// Sample data for the organization structure
const data = {
    name: "Xuanrui Hu (Mike)",
    children: [
        {
            name: "Partner 1",
            children: [
                { name: "Downline 1.1" },
                { name: "Downline 1.2" }
            ]
        },
        {
            name: "Partner 2",
            children: [
                { name: "Downline 2.1" }
            ]
        }
    ]
};

// Set up the dimensions and margins for the SVG
const width = 600;
const height = 400;
const margin = { top: 20, right: 120, bottom: 20, left: 120 };

// Create an SVG element and append it to the orgChart div
const svg = d3.select("#orgChart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Create a tree layout with specified dimensions
const treeLayout = d3.tree().size([width - margin.right - margin.left, height - margin.top - margin.bottom]);

// Convert data into a hierarchical structure
const root = d3.hierarchy(data);

// Assign the tree layout to the root
treeLayout(root);

// Create links between nodes
svg.selectAll(".link")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));

// Create nodes for each data point
const node = svg.selectAll(".node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.y},${d.x})`);

// Add rectangles for the name cards
node.append("rect")
    .attr("x", -50)
    .attr("y", -20)
    .attr("width", 100)
    .attr("height", 40)
    .attr("rx", 5)
    .attr("ry", 5);

// Add text to the nodes
node.append("text")
    .attr("dy", 5)
    .attr("dx", 0)
    .style("text-anchor", "middle")
    .text(d => d.data.name);
