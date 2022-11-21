import React, { MouseEvent, useCallback } from "react";

import { initialData } from "../reducer/FlowReducer";

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  HandleType,
} from "reactflow";

import "reactflow/dist/style.css";

const Main = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);

  const onConnect = useCallback(
    (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeDragStop = (e: React.MouseEvent, node: Node) => {
    console.log("======");
    console.log(node);
    console.log("======");
  };

  const onEdgeUpdateEnd = (e: any, edge: Edge, handleType: HandleType) => {
    console.log("*****");
    console.log(edge);
    console.log("*****");
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
      fitView
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default Main;
