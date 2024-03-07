import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import New from "./New";
import "./App.css";

/*
리액트 라우터 이용, home 페이지와 new(등록) 페이지로 나누어서 페이지를 관리

*/
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="new" element={<New />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
