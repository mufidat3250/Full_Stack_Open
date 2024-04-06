import Anecdote from "./components/Anecdote";
import Anecdotes from "./components/Anecdotes";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdote())
  }, []);

  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <Anecdotes />
      <Anecdote />
    </div>
  );
};

export default App;
