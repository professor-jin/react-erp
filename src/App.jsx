import LayoutBase from "./Layout";
import routes from "./router";
import useRoutesWithGuard from './router/useRoutesWithGuard' // 引入自定义路由守卫
import './App.css';

function App() {
  return (
    <div className="App">
      <LayoutBase>{useRoutesWithGuard(routes)}</LayoutBase>
    </div>
  );
}

export default App;
