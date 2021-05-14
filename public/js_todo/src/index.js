
const onClickAdd = () => {
  const inputText = document.getElementById("add-text").value;
  console.log("** onClickAdd in", inputText);
  document.getElementById("add-text").value = ""; //ボタン押下時に空に

  // 要素を作っていく
  createIncompleteList(inputText);
}

document.getElementById("add-button").addEventListener("click", () => onClickAdd());


// 未完了リストから指定の要素を削除する
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
}

// 未完了リストに追加する
const createIncompleteList = (text) => {
  const div = document.createElement("div");
  div.className = "list-row";
  const li = document.createElement("li");
  li.innerText = text;

  const completeBtn = document.createElement("button");
  completeBtn.innerText = "やっぱ完了";
  completeBtn.addEventListener("click", () => {
    // 未完了リストから削除
    deleteFromIncompleteList(completeBtn.parentNode);
    // div要素を取得、liとボタンを追加して完了リストに追加
    const addTarget = completeBtn.parentNode;
    const text = addTarget.firstElementChild.innerText;
    addTarget.textContent = null;

    const li = document.createElement("li");
    li.innerText = text;
    const backBtn = document.createElement("button");
    backBtn.innerText = "戻すよ";
    backBtn.addEventListener("click", () => {
      document.getElementById("complete-list").removeChild(backBtn.parentNode);
      const text = backBtn.parentNode.firstElementChild.innerText;
      createIncompleteList(text); // 自分を呼んでいるがこれで動く
    });

    addTarget.appendChild(li);
    addTarget.appendChild(backBtn);
    document.getElementById("complete-list").appendChild(addTarget);
  });
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "やっぱ消す";
  deleteBtn.addEventListener("click", () => {
    deleteFromIncompleteList(deleteBtn.parentNode);
  });

  div.appendChild(li);
  div.appendChild(completeBtn);
  div.appendChild(deleteBtn);
  document.getElementById("incomplete-list").appendChild(div);
}