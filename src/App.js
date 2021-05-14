import './App.css';
import React, {useState, useEffect} from 'react';
import ColorfulMessage from './components/ColorfulMessage'
import InputTodo from './components/InputTodo'
import InCompleteTodos from './components/InCompleteTodos'
import CompleteTodos from './components/CompleteTodos'

// Udemy「モダンJavaSciptの基礎から始める挫折しないためのReact入門」のAppコンポーネント
const App = () => {
  const [num, setNum] = useState(0);
  const [faceShowFlag, setFaceShowFlag] = useState(true);
  // TODOリスト用
  const [newTodoText, setNewToDoText] = useState('');
  const [inCompleteTodos, setInCompleteTodos] = useState(['task1','task2']);
  const [completeTodos, setCompleteTodos] = useState(['Completed task1']);
  const [showAlertMsgFlag, setShowAlertMsgFlag] = useState(false);

  const onClickCountUp = () => {
    return setNum(num + 1);
  }
  const onClickSwitchShowFlag = () => {
    setFaceShowFlag(!faceShowFlag);
  }

  // カウンタアップでnumが更新された場合にのみ行う処理
  useEffect(() => {
    console.log("useEffect() in 関心の分離でnum変更時のみ");
    if (num > 0) {
      if (num % 3 === 0) {
        // 左辺がfalseと判定されたら右辺を返す=右辺が実行される。JSの言語仕様を利用した技。
        faceShowFlag || setFaceShowFlag(true);
      } else {
        // 左辺がtrueと判定されたら右辺を返す=右辺が実行される。
        faceShowFlag && setFaceShowFlag(false);
      }
    }
  // eslint-disable-next-line
  }, [num]); // ここではfaceShowFlagは指定したくない為。

  // 初期表示時のみの処理
  useEffect(() => {
    console.log("useEffect() in 初期表示時のみ");
  }, []);

  // タスクの数が変更された場合にのみ行う処理
  useEffect(() => {
    console.log("useEffect() in タスクの数変更時のみ");
    const show = inCompleteTodos.length >= 5? true : false;
    setShowAlertMsgFlag(show);
    console.log("useEffect() showAlertMsgFlag:", showAlertMsgFlag);
}, [inCompleteTodos, showAlertMsgFlag]);
  // React Hook useEffect has a missing dependency: 'showAlertMsgFlag'. Either include it or remove the dependency array.

  const onChangeNewTodoText = (event) => {
    console.log("onChangeNewTodoText() in");
    return setNewToDoText(event.target.value);
  }
  const onClickAddBtn = () => {
    if (newTodoText.length === 0) {
      return;
    }
    console.log("onClickAddBtn() in", newTodoText);
    const newTodos = [...inCompleteTodos, newTodoText]; //スプレッド構文で文字列配列の最後に、新しいTODOが追加
    setInCompleteTodos(newTodos);
    setNewToDoText("");
  }

  // ボタン押下時のイベントハンドラに引数がある時
  // onClick={onClickCompBtn(index)} と書くと初期表示時にそのまま実行されてしまう。
  // onClick={() => onClickCompBtn(index)} とイベントハンドラを実行する無名関数をアローで書く。
  // ここは分かりにくい。Vue.jsの方がシンプルなような。
  const onClickCompBtn = (index) => {
    console.log("onClickCompBtn() in index:", index);
    const copiedInCompTodos = [...inCompleteTodos]; // 参照を引き継がずにコピー
    copiedInCompTodos.splice(index, 1); //index番目から1つを削除
    const copiedCompTodos = [...completeTodos, inCompleteTodos[index]]; // 最後に追加
    setInCompleteTodos(copiedInCompTodos);
    setCompleteTodos(copiedCompTodos);
  }
  const onClickDelBtn = (index) => {
    console.log("onClickDelBtn() in index:", index);
    const copiedInCompTodos = [...inCompleteTodos]; // 参照を引き継がずにコピー
    copiedInCompTodos.splice(index, 1); //index番目から1つを削除
    setInCompleteTodos(copiedInCompTodos);
  }
  const onClickRestoreBtn = (index) => {
    console.log("onClickRestoreBtn() in index:", index);
    const copiedCompTodos = [...completeTodos]; // 参照を引き継がずにコピー
    copiedCompTodos.splice(index, 1); //index番目から1つを削除
    const copiedInCompTodos = [...inCompleteTodos, completeTodos[index]]; // 最後に追加
    setCompleteTodos(copiedCompTodos);
    setInCompleteTodos(copiedInCompTodos);
  }


  // 子コンポーネントに渡すpropsで、useStateで管理しているステート、イベントハンドラの関数も普通に渡せる。
  // props名がその子コンポーネント名と被っているとまずい模様。
  // 消化しる! の左辺の判定を単に関数に切り出すだけではだめ。stateに持って更新すると、InputTodoコンポのpropsに渡す時にも使えてDRYになる。
  // →このへんはVue.jsのタグ内のディレクティブの方が分かりやすいような気も。
  return (
    <div className="App">
      <h3 style={{color: 'blue'}}>『モダンJavaSciptの基礎から始める挫折しないためのReact入門』動作確認とTODOアプリ</h3>
      <ColorfulMessage color="red" msg="げんき?" >タグの間</ColorfulMessage>
      <ColorfulMessage color="pink" msg="ピンクだよ" />
      <button onClick={onClickCountUp}>カウントアップしよう</button>
      <span>{num}</span> <br/>
      <button onClick={onClickSwitchShowFlag}>AA切り替えるぞい</button>
      <span>{faceShowFlag && <span>(/・ω・)/</span> }</span>

      {showAlertMsgFlag && <p style={{color: "red"}}>登録できるTODOは5個まで。消化しる！</p> }
      <InputTodo todoText={newTodoText} onChange={onChangeNewTodoText} onClick={onClickAddBtn} tobeDisabled={showAlertMsgFlag} />
      <InCompleteTodos todos={inCompleteTodos} onClickCompBtn={onClickCompBtn} onClickDelBtn={onClickDelBtn}/>
      <CompleteTodos todos={completeTodos} onClickRestoreBtn={onClickRestoreBtn}/>

    </div>
  );
}

export default App;
