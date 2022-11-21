import React from "react";

export enum ActionType {
  UPDATE_NODE = "update_node",
  UPDATE_EDGE = "update_edge",
}

export type NodeType = {
  id: string;
  type: string;
  data: {
    label: string;
  };
  position: {
    x: number;
    y: number;
  };
};

export type EdgeType = {
  id: string;
  source: string;
  target: string;
  label: string;
  type: string;
};

export type FlowState = {
  nodes: NodeType[];
  edges: EdgeType[];
};

export const initialData = {
  nodes: [
    {
      id: "1",
      data: { label: "Hello" },
      position: { x: 0, y: 0 },
      type: "input",
    },
    {
      id: "2",
      data: { label: "World" },
      position: { x: 100, y: 100 },
    },
  ],
  edges: [
    { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
  ],
};

export const FlowReducer = (state: FlowState, action: ActionType) => {};
