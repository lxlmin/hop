import Routes from "./router/index";
// 默认情况下组件因props变化导致重新渲染的比较方式是 深对比 （对比前后props的引用地址是否一致）（神行一致才不会重新渲染）
// 当使用React.memo包裹一个组件后 该组件的props的对比方式 浅对比
// React.memo 将组建的props对比方式由深改为浅
// useCallback 保持函数的引用，非必要不变化
// ref转变
// forwardRef  传递ref，把ref向组件内部传递
// useMemo  ---做数据的缓存，非必要不更新
const App = () => (
  <div>
    <Routes />
  </div>
);

export default App;
