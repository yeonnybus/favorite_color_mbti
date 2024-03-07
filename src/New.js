import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MBTISelect from "./components/MBTISelect";
import ColorInput from "./components/ColorInput";
import Button from "./components/Button";
import generateColorCode from "./lib/generateColorCode";
import axios from "./lib/axios";
import styles from "./New.module.css";

function New() {
  // 생성 페이지의 value 설정, 기본값은 좌측 선택지인 ESTJ임~
  const [formValue, setFormValue] = useState({
    mbti: "ESTJ",
    colorCode: "#000000",
  });
  const navigate = useNavigate();

  // colorInput.js와 상호작용
  function handleChange(name, value) {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  }

  function handleRandomClick() {
    //generateColorCode.js 통해 랜덤 값 생성, 입력
    const nextColorCode = generateColorCode();
    handleChange("colorCode", nextColorCode);
  }

  //async-await 구문 사용 비동기 처리
  async function handleSubmit() {
    await axios.post("/color-surveys/", {
      ...formValue,
      password: "0000",
    });
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerHeading}>새 컬러 등록하기</h1>
        <Link className={styles.cancel} to="/">
          <img className={styles.cancelIcon} src="/images/x.svg" alt="취소" />
        </Link>
      </header>
      {/*
      분리를 위해 section 태그를 사용했음. HTML5에서 추가된 요소로, 일반적으로 제목 요소를 포함한다.
      */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>MBTI</h2>
        <MBTISelect
          value={formValue.mbti}
          onChange={(newMbti) => handleChange("mbti", newMbti)}
        />
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>
          컬러
          <button className={styles.random} onClick={handleRandomClick}>
            <img
              className={styles.repeatIcon}
              src="/images/repeat.svg"
              alt="랜덤"
            />
          </button>
        </h2>
        <ColorInput
          value={formValue.colorCode}
          onChange={(newColorCode) => handleChange("colorCode", newColorCode)}
        />
      </section>
      <Button className={styles.submit} onClick={handleSubmit}>
        컬러 등록
      </Button>
    </div>
  );
}

export default New;
