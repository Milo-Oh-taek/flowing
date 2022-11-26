import React, { useEffect, useState } from "react";
import SideCard from "../components/SideCard";

import { Input, InputNumber, Badge, Space, Switch, Button } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { NodeType } from "../Types";

import styles from "./Rightside.module.css";

import produce from "immer";

import { ChromePicker } from "react-color";

const Rightside = ({
  clickedNode,
  mutateNode,
}: {
  clickedNode: NodeType | undefined;
  mutateNode: (node: NodeType) => void;
}) => {
  console.log("arrived");
  console.log(clickedNode);

  // const [color, setColor] = useState<string>();
  const [colorPicker, setColorPicker] = useState(false);

  const [node, setNode] = useState<NodeType>();

  useEffect(() => {
    setNode(clickedNode);
  }, [clickedNode]);

  const onChange = () => {
    console.log("changed");
  };

  const onChangeColor = (e: any) => {
    console.log(e.hex);

    setNode(
      produce((draft) => {
        draft!.style!.backgroundColor = e.hex;
      })
    );
  };

  const mutateHandler = () => {
    if (!node) return;
    mutateNode(node);
  };

  return (
    <>
      <SideCard title="Label">
        <Input placeholder="Basic usage" value={clickedNode?.data.label} />
      </SideCard>
      <SideCard title="Width">
        <InputNumber
          value={Number(
            clickedNode?.style?.width?.toString().replace("px", "")
          )}
          name="width"
          min={1}
          max={500}
          onChange={onChange}
          prefix="px"
        />
      </SideCard>
      <SideCard title="Height">
        <InputNumber
          value={Number(
            clickedNode?.style?.height?.toString().replace("px", "")
          )}
          name="height"
          min={1}
          max={500}
          onChange={onChange}
          prefix="px"
        />
      </SideCard>
      <SideCard title="Background">
        <Input
          value={node?.style?.backgroundColor}
          onFocus={() => setColorPicker(true)}
        />
        <Switch
          checked={colorPicker}
          onChange={() => setColorPicker(!colorPicker)}
        />
        {colorPicker ? (
          <ChromePicker
            color={node?.style?.backgroundColor}
            onChange={onChangeColor}
          />
        ) : null}
      </SideCard>
      <Button onClick={mutateHandler}>Primary Button</Button>
    </>
  );
};

export default Rightside;
