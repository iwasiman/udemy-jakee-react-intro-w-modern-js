import React from 'react';

const InputTodo = (props) => {
  const {todoText, onChange, onClick, tobeDisabled} = props; // 分割代入

  const style = {
    backgroundColor: '#e1e292',
    width: '400px',
    height: '30px',
    padding: '8px',
    margin: '8px',
    borderRradius: '8px'
  };
  return (
    <div style={style}>
      <input disabled={tobeDisabled} placeholder="TODOを入力してね" id="add-text" value={todoText} onChange={onChange} />
      <button disabled={tobeDisabled} id="add-button" onClick={onClick}>追加だよ</button>
    </div>
  )
};

export default InputTodo;


