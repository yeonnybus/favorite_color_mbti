/*
함수 설명
Math.random(): 0 ~ 1 사이의 임의의 소수를 만든다.
Math.floor(): 값의 크기보다 작은 정수 중 가장 큰 수로 바꾼다. (예를 들면 3.14 → 3으로 바꿈)
toString(16): 16진수 문자열로 만든다.
padStart(2, '0'): 두 글자 길이로 만들고, 만약 한 글자인 경우에는 앞 글자에 '0' 을 채워 넣는다.
toUpperCase(): 대문자로 만든다.
*/

function generateRandomHex() {
  const num = Math.floor(Math.random() * 256);
  const hex = num.toString(16).padStart(2, "0").toUpperCase();
  return hex;
}

export default function generateColorCode() {
  const colorCode = `#${generateRandomHex()}${generateRandomHex()}${generateRandomHex()}`;
  return colorCode;
}
