import {useRecoilState} from 'recoil';
import {todoListState} from '../atoms/atom';

import {ITodoTypes} from '../atoms/atom';

interface Iprops {
  key: number;
  item: ITodoTypes;
}

function TodoItem({item}: Iprops) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input type="checkbox" checked={item.isComplete} onChange={toggleItemCompletion} />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

export default TodoItem;

function replaceItemAtIndex(arr: ITodoTypes[], index: number, newValue: ITodoTypes) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: ITodoTypes[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
