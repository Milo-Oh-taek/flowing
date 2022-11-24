export type XYPosition = {
  x: number;
  y: number;
};

export enum Position {
  Left = "left",
  Top = "top",
  Right = "right",
  Bottom = "bottom",
}

export type CoordinateExtent = [[number, number], [number, number]];

export type NodeType<T = any> = {
  id: string;
  position: XYPosition;
  data: T;
  type?: string;
  style?: React.CSSProperties;
  className?: string;
  targetPosition?: Position;
  sourcePosition?: Position;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  deletable?: boolean;
  focusable?: boolean;
  dragHandle?: string;
  width?: number | null;
  height?: number | null;
  parentNode?: string;
  zIndex?: number;
  extent?: "parent" | CoordinateExtent;
  expandParent?: boolean;
  positionAbsolute?: XYPosition;
  ariaLabel?: string;

  // only used internally
  //   [internalsSymbol]?: {
  //     z?: number;
  //     handleBounds?: NodeHandleBounds;
  //     isParent?: boolean;
  //   };
};
