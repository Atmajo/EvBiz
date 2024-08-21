function generate() {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  var st = "";
  for (var i = 0; i < 6; i++) {
    st = st + digits[parseInt((Math.random() * 10).toString())];
  }

  return st;
}

export const otps = () => {
  return generate();
};
