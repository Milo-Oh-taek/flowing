import React, { CSSProperties, useEffect, useState } from "react";
import SideCard from "../components/SideCard";

import { Input, InputNumber, Badge, Space, Switch, Button, Card } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import { NodeType, NodeStyleType, NodeDataType } from "../Types";

import styles from "./Rightside.module.css";

import produce from "immer";

import { ChromePicker, ColorChangeHandler } from "react-color";

const Rightside = ({
  clickedNode,
  mutateLabel,
  mutateStyle,
  resetSelect,
}: {
  clickedNode: NodeType | undefined;
  mutateLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mutateStyle: (style: CSSProperties) => void;
  resetSelect: () => void;
}) => {
  const [data, setData] = useState<NodeDataType>();
  const [style, setStyle] = useState<CSSProperties>();

  const [colorPicker, setColorPicker] = useState(false);

  useEffect(() => {
    if (!clickedNode) return;

    setData(clickedNode.data);
    setStyle(clickedNode.style);
  }, [clickedNode]);

  useEffect(() => {
    mutateStyle(style!);
  }, [style]);

  const styleHandler = (
    e: any,
    extra?: ColorChangeHandler | null,
    name?: "width" | "height"
  ) => {
    if (!style) return;

    //배경색 변경
    if (e.hex) {
      setStyle(
        produce((draft) => {
          draft!.backgroundColor = e.hex;
        })
      );
      return;
    }
    // width, height 변경
    if (name) {
      setStyle(
        produce((draft) => {
          draft![name] = e;
        })
      );
      return;
    }
  };

  return (
    <>
      {clickedNode && (
        <>
          <Card title="Label">
            <Input
              placeholder="Basic usage"
              value={clickedNode?.data.label}
              name="label"
              onChange={mutateLabel}
            />
          </Card>
          <Card title="Width">
            <InputNumber
              value={Number(
                clickedNode?.style!.width!.toString().replace("px", "")
              )}
              name="width"
              min={1}
              max={500}
              onChange={(v) => styleHandler(v, null, "width")}
              prefix="px"
            />
          </Card>
          <Card title="Height">
            <InputNumber
              value={Number(
                clickedNode?.style!.height?.toString().replace("px", "")
              )}
              name="height"
              min={1}
              max={500}
              onChange={(v) => styleHandler(v, null, "height")}
              prefix="px"
            />
          </Card>
          <Card title="Background">
            <Input
              value={clickedNode?.style!.backgroundColor?.toString()}
              onFocus={() => setColorPicker(true)}
              style={{ width: "50%" }}
            />
            <Switch
              checked={colorPicker}
              onChange={() => setColorPicker(!colorPicker)}
            />
            {colorPicker ? (
              <ChromePicker
                color={clickedNode?.style!.backgroundColor}
                onChange={(v) => styleHandler(v)}
              />
            ) : null}
          </Card>
          <div className={styles.iconDiv}>
            <DoubleRightOutlined
              className={styles.icon}
              onClick={resetSelect}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Rightside;
