import React, { useCallback } from "react";

import { Layout } from "antd";

import "antd/dist/antd.css";

import styles from "./App.module.css";
import Head from "./ui/Head";
import Leftside from "./ui/Leftside";
import Rightside from "./ui/Rightside";
import Main from "./ui/Main";

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

const { Header, Footer, Sider, Content } = Layout;

const initialData = {
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

function App() {
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
    <Layout className={styles.container}>
      <Header className={styles.header} style={{ backgroundColor: "white" }}>
        <Head />
      </Header>
      <Layout>
        <Sider className={styles.leftside} width={300}>
          <Leftside />
        </Sider>
        <Content>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDragStop={onNodeDragStop}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </Content>
        <Sider className={styles.rightside} width={300}>
          <Rightside />
        </Sider>
      </Layout>
      <Footer>
        <Footer />
      </Footer>
    </Layout>
  );
}

export default App;
