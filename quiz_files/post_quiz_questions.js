// creating an array and passing the number, questions, options, and answers
let questions = [
    {
    numb: 1,
    question: "Choose the term that is not the other name of clamper",
    answer: "DC Limiter",
    options: [
      "DC Limiter",
      "D.C Restorers",
      "Baseline Stabilizers",
      "Level Shifter"
    ]
  },
    {
    numb: 2,
    question: "The purpose of a capacitor in a clamper circuit is to...",
    answer: "to provide a dc offset",
    options: [
      "to provide phase shift",
      "to reduce dv/dt",
      "to limit the frequency",
      "to provide a dc offset"
    ]
  },
    {
    numb: 3,
    question: "Which type of clamper gives the following output.<br>V<sub>o</sub> = -2 V<sub>p</sub> + V<sub>b</sub>",
    answer: "Negative biased clamper with positive reference",
    options: [
      "Negative biased clamper with negative reference",
      "Positive biased clamper with positive reference",
      "Negative biased clamper with positive reference",
      "Positive biased clamper with negative reference"
    ]
  },
    {
    numb: 4,
    question: "If the input frequency is very high, the output of clamper may become distorted. This is due to...",
    answer: "large reverse recovery time of diode",
    options: [
      "low capacitance",
      "high load resistance",
      "large reverse recovery time of diode",
      "None of the above"
    ]
  },
    {
    numb: 5,
    question: "In steady state operation of a clamper circuit, the diode will be ...",
    answer: "Reverse biased",
    options: [
      "Forward biased",
      "Reverse biased",
      "Depends on the type of clamper",
      "None of the above"
    ]
  },
  // you can uncomment the below codes and make duplicate as more as you want to add question
  // but remember you need to give the numb value serialize like 1,2,3,5,6,7,8,9.....

  //   {
  //   numb: 6,
  //   question: "Your Question is Here",
  //   answer: "Correct answer of the question is here",
  //   options: [
  //     "Option 1",
  //     "option 2",
  //     "option 3",
  //     "option 4"
  //   ]
  // },
];