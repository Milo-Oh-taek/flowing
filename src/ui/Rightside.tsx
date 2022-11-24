import React from "react";
import SideCard from "../components/SideCard";

import { Input } from "antd";

import { NodeType } from "../Types";

import styles from "./Rightside.module.css";

const Rightside = ({ clickedNode }: { clickedNode: NodeType | undefined }) => {
  console.log("arrived");
  console.log(clickedNode);
  return (
    <SideCard title="Type">
      <Input placeholder="Basic usage" value={clickedNode?.data.label} />
    </SideCard>
  );
};

export default Rightside;
