import React from 'react';
import { useDispatch } from 'react-redux';
import counterSlice from './counter/slice';
import { useCounterState } from './counter/selectors';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const state = useCounterState().counter;

  const onClickIncrement = () => {
    dispatch(counterSlice.actions.incrementCounter(1));
  };

  const onClickDecrement = () => {
    dispatch(counterSlice.actions.decrementCounter(1));
  };

  return (
    <>
      <button type="button" onClick={onClickIncrement}>
        add
      </button>
      <button type="button" onClick={onClickDecrement}>
        delete
      </button>
      <p>count:{state.count}</p>
    </>
  );
};

export default App;
