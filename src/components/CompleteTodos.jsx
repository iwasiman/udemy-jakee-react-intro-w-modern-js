import React from 'react';

const CompleteTodos = (props) => {
  const {todos, onClickRestoreBtn} = props; // 分割代入
  return (
    <div className="complete-area">
      <p className="title">完了したTODOs</p>
      <ul id="complete-list">
        {
          todos.map((aTodo, index) => {
            return (
              <div key={index} className="list-row">
                <li>{aTodo}</li>
                <button onClick={() => onClickRestoreBtn(index)}>戻すよ</button>
              </div>
            )
          })
        }
      </ul>
    </div>
  )
};

export default CompleteTodos;


