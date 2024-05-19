import { Provider } from 'react-redux'
import './App.css'
import TodoContainer from './components/Container'
import TopBar from './components/TopBar'
import store from './store/store'
import Example from './components/example'

function App() {

  return (
    <Provider store={store}>
      <TopBar/>
      <TodoContainer/>
      <Example/>
    </Provider>
  )
}

export default App
