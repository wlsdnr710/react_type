const alphaToHangul = {
  q: "ㅂ",
  w: "ㅈ",
  e: "ㄷ",
  r: "ㄱ",
  t: "ㅅ",
  y: "ㅛ",
  u: "ㅕ",
  i: "ㅑ",
  o: "ㅐ",
  p: "ㅔ",
  a: "ㅁ",
  s: "ㄴ",
  d: "ㅇ",
  f: "ㄹ",
  g: "ㅎ",
  h: "ㅗ",
  j: "ㅓ",
  k: "ㅏ",
  l: "ㅣ",
  z: "ㅋ",
  x: "ㅌ",
  c: "ㅊ",
  v: "ㅍ",
  b: "ㅠ",
  n: "ㅜ",
  m: "ㅡ",
};

const shiftHangul = {
  ㅂ: "ㅃ",
  ㅈ: "ㅉ",
  ㄷ: "ㄸ",
  ㄱ: "ㄲ",
  ㅅ: "ㅆ",
  ㅛ: "ㅛ",
  ㅕ: "ㅕ",
  ㅑ: "ㅑ",
  ㅐ: "ㅒ",
  ㅔ: "ㅖ",
  ㅁ: "ㅁ",
  ㄴ: "ㄴ",
  ㅇ: "ㅇ",
  ㄹ: "ㄹ",
  ㅎ: "ㅎ",
  ㅗ: "ㅗ",
  ㅓ: "ㅓ",
  ㅏ: "ㅏ",
  ㅣ: "ㅣ",
  ㅋ: "ㅋ",
  ㅌ: "ㅌ",
  ㅊ: "ㅊ",
  ㅍ: "ㅍ",
  ㅠ: "ㅠ",
  ㅜ: "ㅜ",
  ㅡ: "ㅡ",
};

const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;


export function translateHangul(character, shiftKey) {
  const lowerChar = character.toLowerCase();
  let resultChar = character;
  if (lowerChar in alphaToHangul) {
    resultChar = alphaToHangul[lowerChar];
  } else {
    return resultChar;
  }
  if (shiftKey) {
    resultChar = shiftHangul[resultChar];
  }
  return resultChar;
}

export function isHangulChar(string) {
  return korean.test(string);
}


