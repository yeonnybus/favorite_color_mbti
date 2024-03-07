import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ColorSurvey from "./components/ColorSurvey";
import axios from "./lib/axios";
import styles from "./Home.module.css";

function Home() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(null);
  const nextPageRef = useRef(null);
  const isLoadingRef = useRef(false);

  /*
    axios에서는 null이나 undefined 값을 알아서 처리하기 때문에, mbti라는 파라미터를 그대로
    객체로 만듦.
    axios를 통해 값을 불러와 setItems 메소드로 items를 설정함.
    -> 리턴에서는 이 설정된 items들을 ColorSurvey로 보내 화면에 표시하는 것!
    */
  async function handleLoad(mbti) {
    const res = await axios.get("/color-surveys/", {
      params: { mbti, limit: 20 },
    });
    const nextItems = res.data.results;
    nextPageRef.current = res.data.next;
    setItems(nextItems);
  }

  async function handleLoadNext() {
    const res = await axios.get(nextPageRef.current);
    const data = res.data;
    setItems((prevItems) => [...prevItems, ...data.results]);
    nextPageRef.current = data.next;
  }

  useEffect(() => {
    handleLoad(filter);
  }, [filter]);

  /*
  useEffet의 디펜던시리스트를 빈 배열로 구성하여, 1회 동작하게 함.
  무한 스크롤을 구현하는 방법에는 크게 두 가지 방법이 있는데,
  window 객체의 스크롤 이벤트를 활용하는 방법과 비교적 최근에 나온 Intersection Observer라는 것을 활용하는 방법이 있음.

  여기서는 window 객체의 스크롤 이벤트를 사용함!

  1회 동작하지만, useEffect 안에서 등록한 이벤트 리스너나 비동기 작업은 
  컴포넌트의 생명주기에 맞게 설정된다는 것을 기억!

  maxScrollTop값을 넘어서는 순간, 즉 맨 아래로 스크롤 되는 순간에 handleLoadNext()를 실행.

  일단 다음 페이지가 있는 경우에만 실행해야 하고(nextPageRef.current값이 존재할 때만 실행) 
  handleScroll()이 실행되지 않는 경우에만 실행해야 함.
  
  -> 스크롤 이벤트는 스크롤 할 때마다 계속 실행되기 때문에 중복해서 실행될 수 있음
  그래서 isLoadingRef라는 Ref Object를 만들어서 중복으로 실행되지 않도록 막아주어야함.
  */
  useEffect(() => {
    async function handleScroll() {
      if (!nextPageRef.current || isLoadingRef.current) return;
      isLoadingRef.current = true;
      const maxScrollTop =
        document.documentElement.offsetHeight - window.innerHeight - 100;
      //document.documentElement.offsetHeight: 현재 문서의 높이
      //window.innerHeight: 현재 창의 높이
      const currentScrollTop = document.documentElement.scrollTop;
      //document.documentElement.scrollTop: 현재 화면 상단의 Y 좌표
      if (currentScrollTop >= maxScrollTop) {
        await handleLoadNext();
      }
      isLoadingRef.current = false;
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 기본적으로 css-module을 사용하였음
  // css-module을 이용하면 클래스명이 충돌하는 단점을 해결 할 수 있고,
  // css-module을 이용하면 컴포넌트 단위로 스타일을 적용할 수 있음.
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <h1 className={styles.heading}>
            MBTI별
            <br />
            <span className={styles.accent}>좋아하는 컬러</span>
          </h1>
          <div>
            {filter && (
              <div className={styles.filter} onClick={() => setFilter(null)}>
                {filter}
                <img
                  className={styles.removeIcon}
                  src="/images/x.svg"
                  alt="필터 삭제"
                />
              </div>
            )}
          </div>
        </header>
      </div>
      <main className={styles.content}>
        <Link className={styles.addItem} to="/new">
          + 새 컬러 등록하기
        </Link>
        {/*
        ul태그와 li태그에다가 map메소드를 통해 item을 ColorSurvey로 나열함.
        */}
        <ul className={styles.items}>
          {items.map((item) => (
            <li key={item.id}>
              <ColorSurvey value={item} onClick={() => setFilter(item.mbti)} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Home;
