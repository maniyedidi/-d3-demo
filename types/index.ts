import * as d3 from "d3";

export interface LinkData extends d3.SimulationLinkDatum<NodeData> {
  source: string | NodeData;
  target: string | NodeData;
}

export interface NodeData extends d3.SimulationNodeDatum {
  id: string;
}

export interface ForceGraphProps {
  nodes: NodeData[];
  links: LinkData[];
}
