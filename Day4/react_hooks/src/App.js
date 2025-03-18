
import './App.css';
import { ThemeContext } from './Components/context/ThemeContext';
import ContextEx1 from './Components/ContextEx1/contextEx1';
import ContextEx2 from './Components/ContextEx2/contextEx2';




import UseMem1 from './Components/Memo1/memo1';
import UseMemo2 from './Components/Memo2/memo2';
import UseMemo3 from './Components/Memo3/memo3';
import RefEx1 from './Components/RefExample1/refEx1';
import RefEx2 from './Components/RefExample2/refEx2';
import UserShow from './Components/UserShow/userShow';

function App() {
  return (
    <div className="App">
      <RefEx1/>
      <hr/>
      <RefEx2/>
      <hr/>
      <UseMem1/>
      <hr/>
      <UseMemo2/>
      <hr/>
      <UseMemo3/>
      <hr/>
      <ContextEx1/>
      <hr/>
      <ContextEx2/>
      <hr/>
      <ThemeContext/>
      <hr/>
      <UserShow/>
      


     
    </div>
  );
}

export default App;
