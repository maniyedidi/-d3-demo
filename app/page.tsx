"use client";
import ForceGraph from "@/components/ForceGraph";
import { LinkData, NodeData } from "@/types";
import { useState } from "react";

const nodes: NodeData[] = [
  { id: 'Mani' },
  { id: 'Prudhvi' },
  { id: 'Charlie' },
  { id: 'Georgios' },
  { id: 'Eva' },
  { id: 'Frank' },
  { id: 'Grace' },
  { id: 'Hannah' },
  { id: 'Ivan' },
  { id: 'Julia' },
];

const links: LinkData[] = [
  { source: 'Mani', target: 'Prudhvi' },
  { source: 'Mani', target: 'Charlie' },
  { source: 'Prudhvi', target: 'Georgios' },
  { source: 'Charlie', target: 'Eva' },
  { source: 'Georgios', target: 'Frank' },
  { source: 'Eva', target: 'Grace' },
  { source: 'Frank', target: 'Hannah' },
  { source: 'Grace', target: 'Ivan' },
  { source: 'Hannah', target: 'Julia' },
  { source: 'Julia', target: 'Mani' },
  { source: 'Ivan', target: 'Charlie' },
];

export default function Home() {
  const [nodesString, setNodesString] = useState(JSON.stringify(nodes));
  const [linksString, setLinksString] = useState(JSON.stringify(links));
  const [finalData, setFinalData] = useState({
    nodes: nodes,
    links: links,
  });

  const handleGenerate = () => {
    try {
      const parsedNodes = JSON.parse(nodesString);
      const parsedLinks = JSON.parse(linksString);
      debugger;
      setFinalData({
        nodes: parsedNodes,
        links: parsedLinks,
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Invalid JSON format. Please check your input.");
    }
  };

  return (
    <main className="bg-gray-100 m-7">
      <div className="grid grid-cols-2">
        <div>
          <h1 className="text-black">Enter Nodes String</h1>
          <textarea
            className="w-full h-64 p-2 border rounded bg-white text-black"
            placeholder="Paste JSON string here"
            value={nodesString}
            onChange={(e) => setNodesString(e.target.value)}
          />

          <h1 className="text-black">Enter Links Data</h1>
          <textarea
            className="w-full h-64 p-2 border rounded bg-white text-black"
            placeholder="Paste JSON string here"
            value={linksString}
            onChange={(e) => setLinksString(e.target.value)}
          />
          <button
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleGenerate}
          >
            Generate
          </button>
        </div>
        <div>
          <h1>Force Layout Example</h1>
          <ForceGraph
            key={JSON.stringify(finalData)}
            nodes={finalData.nodes}
            links={finalData.links}
          />
        </div>
      </div>
    </main>
  );
}
