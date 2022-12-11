import React, { useState, useRef, useMemo, useEffect } from "react";
import SideCard from "../components/SideCard";

import { Button, Card, Input, Radio } from "antd";

import { NodeType } from "../Types";

import styles from "./Leftside.module.css";

import produce from "immer";

const initialNode = {
  id: 4 + "",
  type: "input",
  position: {
    x: 0,
    y: 0,
  },
  data: {
    label: "",
  },
  style: {
    width: "150px",
    height: "39px",
    backgroundColor: "",
  },
};

const Leftside = ({
  addNode,
  idCnt,
}: {
  addNode: (node: NodeType) => void;
  idCnt: number;
}) => {
  const [node, setNode] = useState<NodeType>(initialNode);

  const onChange = (e: any) => {
    // console.log(e);
    const name = e.target.name;
    const value = e.target.value;

    if (name === "label") {
      setNode(
        produce((draft) => {
          draft!.data.label = value;
        })
      );
    }

    setNode(
      produce((draft) => {
        draft![name] = value;
      })
    );
  };

  useEffect(() => {
    setNode(
      produce((draft) => {
        draft.id = idCnt + 1 + "";
      })
    );
  }, [idCnt]);

  const onClickHandler = () => {
    addNode(node);
    setNode(initialNode);
    console.log(node);
  };

  return (
    <div>
      <SideCard title="Type">
        <Radio.Group onChange={onChange} name="type" value={node.type}>
          <Radio value="input">Input</Radio>
          <Radio value="default">Default</Radio>
          <Radio value="output">Output</Radio>
        </Radio.Group>
      </SideCard>
      <Card title="Label">
        <Input
          placeholder="Label"
          value={node.label}
          name="label"
          onChange={onChange}
        />
      </Card>
      <Button onClick={onClickHandler}>New</Button>
    </div>
  );
};

export default Leftside;
