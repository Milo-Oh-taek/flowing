import React, { useEffect, useState } from "react";
import SideCard from "../components/SideCard";

import { Input, InputNumber, Badge, Space, Switch, Button, Card } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { NodeType, NodeDTOType } from "../Types";

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
  const [nodeDTO, setNodeDTO] = useState<NodeDTOType>();

  useEffect(() => {
    if (clickedNode) {
      setNodeDTO({
        id: clickedNode.id,
        label: clickedNode.data.label,
        width: clickedNode.style!.width
          ? clickedNode.style!.width?.toString().replace("px", "")
          : clickedNode.width?.toString().replace("px", ""),
        height: clickedNode.style!.width
          ? clickedNode.style!.height?.toString().replace("px", "")
          : clickedNode.height?.toString().replace("px", ""),
        background: clickedNode.style!.backgroundColor
          ? clickedNode.style!.backgroundColor
          : undefined,
      });
    }
  }, [clickedNode]);

  const onChange = (e: any, numName?: string) => {
    console.log("changed");
    console.log(e);
    console.log(numName);

    const name = numName ? numName : e.target.name;
    const value = numName ? e.target.value : e;

    if (numName) {
      // setNode(
      //   produce((draft) => {
      //     draft!.style[name] = value;
      //   })
      // );
    }

    setNode(
      produce((draft) => {
        draft!.data.label = value;
      })
    );
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
      <Card title="Label">
        <Input
          placeholder="Basic usage"
          value={nodeDTO?.label}
          name="label"
          onChange={onChange}
        />
      </Card>
      <Card title="Width">
        <InputNumber
          value={Number(nodeDTO?.width)}
          name="width"
          min={1}
          max={500}
          onChange={(e) => onChange(e, "width")}
          prefix="px"
        />
      </Card>
      <Card title="Height">
        <InputNumber
          value={Number(nodeDTO?.height)}
          name="height"
          min={1}
          max={500}
          onChange={(e) => onChange(e, "height")}
          prefix="px"
        />
      </Card>
      <Card title="Background">
        <Input
          value={nodeDTO?.background?.toString()}
          onFocus={() => setColorPicker(true)}
        />
        <Switch
          checked={colorPicker}
          onChange={() => setColorPicker(!colorPicker)}
        />
        {colorPicker ? (
          <ChromePicker color={nodeDTO?.background} onChange={onChangeColor} />
        ) : null}
      </Card>
      <Button onClick={mutateHandler}>Primary Button</Button>
    </>
  );
};

export default Rightside;
