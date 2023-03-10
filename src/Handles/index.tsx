import * as React from 'react';
import Handle from './Handle';
import type { HandleProps } from './Handle';
import { getIndex } from '../util';
import type { OnStartMove } from '../interface';

export interface HandlesProps {
  prefixCls: string;
  style?: React.CSSProperties | React.CSSProperties[];
  values: number[];
  onStartMove: OnStartMove;
  onOffsetChange: (value: number | 'min' | 'max', valueIndex: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  handleRender?: HandleProps['render'];
  draggingIndex: number;
  beginDraggingIndex: number;
  disableds?: boolean[];
}

export interface HandlesRef {
  focus: (index: number) => void;
}

const Handles = React.forwardRef((props: HandlesProps, ref: React.Ref<HandlesRef>) => {
  const {
    disableds,
    prefixCls,
    style,
    onStartMove,
    onOffsetChange,
    values,
    handleRender,
    draggingIndex,
    beginDraggingIndex,
    ...restProps
  } = props;
  const handlesRef = React.useRef<Record<number, HTMLDivElement>>({});

  React.useImperativeHandle(ref, () => ({
    focus: (index: number) => {
      handlesRef.current[index]?.focus();
    },
  }));

  return (
    <>
      {values.map((value, index) => (
        <Handle
          ref={(node) => {
            if (!node) {
              delete handlesRef.current[index];
            } else {
              handlesRef.current[index] = node;
            }
          }}
          dragging={draggingIndex === index}
          draged={beginDraggingIndex === index}
          prefixCls={prefixCls}
          style={getIndex(style, index)}
          key={index}
          value={value}
          valueIndex={index}
          onStartMove={onStartMove}
          onOffsetChange={onOffsetChange}
          render={handleRender}
          useLess={disableds[index]}
          {...restProps}
        />
      ))}
    </>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Handles.displayName = 'Handles';
}

export default Handles;
