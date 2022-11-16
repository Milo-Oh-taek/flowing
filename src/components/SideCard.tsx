import React from "react";
import { Card } from "antd";

type CardProps = { title: string; children: React.ReactNode };

const SideCard = ({ title, children }: CardProps) => {
  return (
    <Card title={title} extra={<a href="#">More</a>} style={{ width: 300 }}>
      {children}
    </Card>
  );
};

export default SideCard;
