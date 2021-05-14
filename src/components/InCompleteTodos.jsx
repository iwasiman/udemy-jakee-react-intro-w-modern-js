import React from 'react';

const InCompleteTodos = (props) => {
  const {todos, onClickCompBtn, onClickDelBtn} = props; // 分割代入
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODOs</p>
      <ul id="incomplete-list">
        {
          todos.map((aTodo, index) => {
            return (
              <div key={index} className="list-row">
                <li>{aTodo}</li>
                <button onClick={() => onClickCompBtn(index)}>完了するよ</button>
                <button onClick={() => onClickDelBtn(index)}>削除するよ</button>
              </div>
            )
          })
        }
      </ul>
    </div>
  )
};

export default InCompleteTodos;


