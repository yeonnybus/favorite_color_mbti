import { useState } from "react";
import { Link } from "react-router-dom";
import mock from "./mock.json";

function Home() {
  const [filter, setFilter] = useState(null);

  return (
    <div>
      <header>
        <h1>MBTI별 좋아하는 컬러</h1>
        {filter && (
          <div onClick={() => setFilter(null)}>
            {filter}
            <img src="/images/x.svg" alt="필터 삭제" />
          </div>
        )}
      </header>
      <div>
        <Link to="/new">+ 새 컬러 등록하기</Link>
        <ul>
          {mock.results.map((item) => (
            <li key={item.id} onClick={() => setFilter(item.mbti)}>
              {item.id} {item.mbti} --- {item.colorCode}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
