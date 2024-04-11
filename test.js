const obj = {
  lessThan: "<",
  greaterThan: ">",
};

function ope(val1, val2, cond) {
  switch (cond) {
    case obj.lessThan:
      return val1 < val2;
    case obj.greaterThan:
      return val1 > val2;
  }
}

console.log(ope(1, 2, obj.greaterThan));
