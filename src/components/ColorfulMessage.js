import React from 'react';

const ColorfulMessage = (props) => {
  // 最初に分割代入するとprops.を書かなくていいので記述が減る
  const {color, msg, children} = props;
  const contentStyle = {
    color: color,
    fontSize: '12px'
  };
  return (
    <p style={contentStyle}>{msg} {children}</p>
  );
}

export default ColorfulMessage;