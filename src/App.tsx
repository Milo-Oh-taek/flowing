import React, {
  BaseSyntheticEvent,
  CSSProperties,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Layout } from "antd";

import "antd/dist/antd.css";

import styles from "./App.module.css";
import Head from "./ui/Head";
import Leftside from "./ui/Leftside";
import Rightside from "./ui/Rightside";
import Main from "./ui/Main";

import produce from "immer";

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
import { NodeDataType, NodeStyleType, NodeType } from "./Types";
import Foot from "./ui/Foot";

const { Header, Footer, Sider, Content } = Layout;

const initialData = {
  nodes: [
    {
      id: "1",
      data: { label: "Input" },
      position: { x: 0, y: 0 },
      type: "input",
      style: {
        width: "150px",
        height: "41px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    {
      id: "2",
      data: { label: "Default" },
      position: { x: 100, y: 100 },
      style: {
        width: "150px",
        height: "41px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    {
      id: "3",
      data: { label: "Output" },
      position: { x: 200, y: 200 },
      type: "output",
      style: {
        width: "150px",
        height: "41px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  ],
  edges: [
    { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
    { id: "2-3", source: "2", target: "3", label: "to the", type: "step" },
  ],
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);
  const [clickedNode, setClickedNode] = useState<NodeType>();

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

  const onNodeClick = (e: React.MouseEvent, node: NodeType) => {
    console.log("clicked");
    console.log(node);
    setClickedNode(node);
  };

  const mutateLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!clickedNode) return;
    setClickedNode(
      produce((draft) => {
        draft!.data.label = e.target.value;
      })
    );
    setNodes(
      produce((draft) => {
        draft.find((node) => node.id === clickedNode.id)!.data.label =
          e.target.value;
      })
    );
  };

  const mutateStyle = (style: CSSProperties) => {
    if (!style || !clickedNode) return;
    setClickedNode(
      produce((draft) => {
        draft!.style = style;
      })
    );
    setNodes(
      produce((draft) => {
        draft!.find((node) => node.id === clickedNode.id)!.style = style;
      })
    );
  };

  const addNode = (node: NodeType) => {
    console.log("new!");
    setNodes(
      produce((draft) => {
        draft!.push(node);
      })
    );
  };

  return (
    <Layout className={styles.container}>
      <Header className={styles.header} style={{ backgroundColor: "white" }}>
        <Head />
      </Header>
      <Layout>
        <Sider className={styles.leftside} width={300}>
          <Leftside addNode={addNode} idCnt={nodes.length} />
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
            onNodeClick={onNodeClick}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </Content>
        {clickedNode && (
          <Sider className={styles.rightside} width={300}>
            <Rightside
              clickedNode={clickedNode}
              mutateLabel={mutateLabel}
              mutateStyle={mutateStyle}
              resetSelect={() => setClickedNode(undefined)}
            />
          </Sider>
        )}
      </Layout>
      <Footer>
        <Foot />
      </Footer>
    </Layout>
  );
}

export default App;
