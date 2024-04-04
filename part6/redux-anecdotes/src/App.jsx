
import Anecdote from './components/Anecdote'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter' 

const App = () => {
 
  return (
    <div>
      <Notification/>
      <Filter/>
       <h2>Anecdotes</h2>
      <Anecdotes/>
      <Anecdote/>
    </div>
  )
}

export default App