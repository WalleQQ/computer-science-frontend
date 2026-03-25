const instructions = {
  "SET A": 0,
  "PRINT A": 1,
  "IFN A": 2,
  RET: 3,
  "DEC A": 4,
  JMP: 5,
};

const program = [
  // Ставим значения аккумулятора
  instructions["SET A"],
  // В 10
  10,

  // Выводим значение на экран
  instructions["PRINT A"],

  // Если A равно 0
  instructions["IFN A"],

  // Программа завершается
  instructions["RET"],

  // И возвращает 0
  0,

  // Уменьшаем A на 1
  instructions["DEC A"],

  // Устанавливаем курсор выполняемой инструкции
  instructions["JMP"],

  // В значение 2
  2,
];

const executeRecursive = (program, ip = 0, A = 0) => {
  switch (program[ip]) {
    case instructions["SET A"]:
      return executeRecursive(program, ip + 2, program[ip + 1]);

    case instructions["PRINT A"]:
      console.log(A);
      return executeRecursive(program, ip + 1, A);

    case instructions["IFN A"]:
      return A === 0
        ? executeRecursive(program, ip + 1, A)
        : executeRecursive(program, ip + 3, A);

    case instructions["RET"]:
      return program[ip + 1];

    case instructions["DEC A"]:
      return executeRecursive(program, ip + 1, A - 1);

    case instructions["JMP"]:
      return executeRecursive(program, program[ip + 1], A);
  }
};

executeRecursive(program);

const execute = (program) => {
  let ip = 0;
  let A = 0;

  while (true) {
    switch (program[ip]) {
      case instructions["SET A"]:
        A = program[ip + 1];
        ip = ip + 2;
        break;

      case instructions["PRINT A"]:
        console.log(A);
        ip = ip + 1;
        break;

      case instructions["IFN A"]:
        A === 0 ? (ip = ip + 1) : (ip = ip + 3);
        break;

      case instructions["RET"]:
        return program[ip + 1];

      case instructions["DEC A"]:
        A--;
        ip = ip + 1;
        break;

      case instructions["JMP"]:
        ip = program[ip + 1];
        break;
    }
  }
};

execute(program);

// Выведет в консоль
// 10
// 9
// 8
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0
// И вернет 0
// execute(program);
