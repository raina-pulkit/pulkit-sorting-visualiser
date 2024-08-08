import { Dispatch, SetStateAction } from "react";

const SECONDARY_COLOR = "red",
  PRIMARY_COLOR = "bisque";
const ANIMATION_SPEED = 600;

export const stopAnimations = (
  timeoutID1: Array<NodeJS.Timeout> | null,
  timeoutID2: Array<NodeJS.Timeout> | null,
  setTimeoutID1: Dispatch<SetStateAction<Array<NodeJS.Timeout> | null>>,
  setTimeoutID2: Dispatch<SetStateAction<Array<NodeJS.Timeout> | null>>
) => {
  if (timeoutID1)
    for (let i = 0; i < timeoutID1.length; i++) clearTimeout(timeoutID1[i]);
  if (timeoutID2)
    for (let i = 0; i < timeoutID2.length; i++) clearTimeout(timeoutID2[i]);

  const bars = Array.from(
    document.getElementsByClassName("bars")
  ) as Array<HTMLDivElement>;
  bars.forEach((bar) => {
    bar.style.backgroundColor = "bisque";
  });

  setTimeoutID1(null);
  setTimeoutID2(null);
};

export const randGenerator = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const heightCalc = (
  num: number,
  minIn: number,
  maxIn: number,
  minOut: number,
  maxOut: number
) => minOut + ((num - minIn) * (maxOut - minOut)) / (maxIn - minIn);

export const heightCalcInv = (
  num: number,
  minIn: number,
  maxIn: number,
  minOut: number,
  maxOut: number
) => Math.round(minIn + ((num - minIn) *(maxIn - minIn))/(maxOut - minOut));

export const animateThisMerge = (
  setTimeoutID1: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  setTimeoutID2: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  num: number,
  arr: number[],
  animations: number[][]
) => {
  const bars = document.getElementsByClassName(
    "bars"
  ) as unknown as Array<HTMLDivElement>;

  setTimeoutID1(new Array<NodeJS.Timeout>(arr.length));
  setTimeoutID2(new Array<NodeJS.Timeout>(bars.length));

  let tempArr = new Array<NodeJS.Timeout>(arr.length);
  let minEl = 1e9,
    maxEl = 0;
  for (let i = 0; i < num; i++) {
    minEl = Math.min(minEl, arr[i]);
    maxEl = Math.max(maxEl, arr[i]);
  }

  for (let i = 0; i < animations.length; i++) {
    // Every 3rd animation is the comparison
    if (i % 3 !== 2) {
      const [barOne, barTwo] = animations[i];

      const color = (i % 3 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;

      tempArr[i] = setTimeout(() => {
        bars[barOne].style.backgroundColor = color;
        bars[barTwo].style.backgroundColor = color;
      }, i * ANIMATION_SPEED);
    } else {
      tempArr[i] = setTimeout(() => {
        const [barOne, newHeight] = animations[i];
        const rand = heightCalc(
          newHeight,
          minEl,
          maxEl,
          10,
          (3 * window.innerHeight) / 4
        );
        bars[barOne].style.height = `${rand}px`;

        bars[barOne].textContent = `${heightCalcInv(rand, minEl, maxEl, 10, (3 * window.innerHeight) / 4)}`;
      }, i * ANIMATION_SPEED);
    }
  }

  setTimeoutID1(tempArr);
  tempArr = new Array<NodeJS.Timeout>(bars.length);

  for (let i = 0; i < bars.length; i++) {
    tempArr[i] = setTimeout(() => {
      bars[i].style.backgroundColor = "green";
    }, animations.length * ANIMATION_SPEED + i * ANIMATION_SPEED);
  }

  setTimeoutID2(tempArr);
};

export const animateThisBubble = (
  setTimeoutID1: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  setTimeoutID2: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  num: number,
  animations: number[][]
) => {
  if (typeof window === "undefined") return;

  const bars = document.getElementsByClassName(
    "bars"
  ) as unknown as Array<HTMLDivElement>;
  const texts = document.getElementsByClassName(
    "heightText"
  ) as unknown as Array<HTMLDivElement>;

  const timeoutArray1 = new Array<NodeJS.Timeout>(animations.length);
  const timeoutArray2 = new Array<NodeJS.Timeout>(bars.length);

  const n = num;
  let prev = n - 1;

  for (let i = 0; i < animations.length; i++) {
    const [barOne, barTwo] = animations[i];

    if (i % 3 == 2) {
      timeoutArray1[i] = setTimeout(() => {
        const tempVal = bars[barOne].style.height;
        bars[barOne].style.height = `${bars[barTwo].style.height}`;
        bars[barTwo].style.height = `${tempVal}`;

        const textTemp = texts[barOne].textContent;
        texts[barOne].textContent = texts[barTwo].textContent;
        texts[barTwo].textContent = textTemp;

        if (barTwo == prev) {
          bars[barTwo].style.backgroundColor = "orange";
          if (prev >= 0) prev--;
        }
      }, i * ANIMATION_SPEED);
    } else {
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      timeoutArray1[i] = setTimeout(() => {
        bars[barOne].style.backgroundColor = color;
        bars[barTwo].style.backgroundColor = color;
      }, i * ANIMATION_SPEED);
    }
  }

  setTimeoutID1(timeoutArray1);

  for (let i = 0; i < bars.length; i++) {
    timeoutArray2[i] = setTimeout(() => {
      bars[i].style.backgroundColor = "green";
    }, animations.length * ANIMATION_SPEED + i * ANIMATION_SPEED);
  }

  setTimeoutID2(timeoutArray2);
};

export const animateThisInsertion = (
  setTimeoutID1: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  setTimeoutID2: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  animations: number[][]
) => {
  if (typeof window === "undefined") return;

  const bars = document.getElementsByClassName(
    "bars"
  ) as unknown as Array<HTMLDivElement>;
  const texts = document.getElementsByClassName(
    "heightText"
  ) as unknown as Array<HTMLDivElement>;

  const timeoutArray1 = new Array<NodeJS.Timeout>(animations.length);
  const timeoutArray2 = new Array<NodeJS.Timeout>(bars.length);

  for (let i = 0; i < animations.length; i++) {
    const [barOne, barTwo] = animations[i];

    if (i % 3 == 2) {
      timeoutArray1[i] = setTimeout(() => {
        const tempVal = bars[barOne].style.height;
        bars[barOne].style.height = `${bars[barTwo].style.height}`;
        bars[barTwo].style.height = `${tempVal}`;

        if (texts.length) {
          const textTemp = texts[barOne].textContent;
          texts[barOne].textContent = texts[barTwo].textContent;
          texts[barTwo].textContent = textTemp;
        }
      }, i * ANIMATION_SPEED);
    } else {
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      timeoutArray1[i] = setTimeout(() => {
        bars[barOne].style.backgroundColor = color;
        bars[barTwo].style.backgroundColor = color;
      }, i * ANIMATION_SPEED);
    }
  }

  setTimeoutID1(timeoutArray1);

  for (let i = 0; i < bars.length; i++) {
    timeoutArray2[i] = setTimeout(() => {
      bars[i].style.backgroundColor = "green";
    }, animations.length * ANIMATION_SPEED + i * ANIMATION_SPEED);
  }

  setTimeoutID2(timeoutArray2);
};

export const animateThisSelection = (
  setTimeoutID1: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  setTimeoutID2: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  num: number,
  animations: number[][]
) => {
  if (typeof window === "undefined") return;

  const bars = document.getElementsByClassName(
    "bars"
  ) as unknown as Array<HTMLDivElement>;
  const texts = document.getElementsByClassName(
    "heightText"
  ) as unknown as Array<HTMLDivElement>;

  const timeoutArray1 = new Array<NodeJS.Timeout>(animations.length);
  const timeoutArray2 = new Array<NodeJS.Timeout>(bars.length);
  let prev = true;

  for (let i = 0; i < animations.length; i++) {
    const [barOne, barTwo] = animations[i];

    if (barOne == barTwo) {
      const color = prev ? SECONDARY_COLOR : PRIMARY_COLOR;
      prev = !prev;

      timeoutArray1[i] = setTimeout(() => {
        bars[barOne].style.backgroundColor = color;
      }, i * ANIMATION_SPEED);
    } else if (barOne == -1) {
      timeoutArray1[i] = setTimeout(() => {
        bars[barTwo].style.backgroundColor = "orange";
      }, i * ANIMATION_SPEED);
    } else if (barOne == -2) {
      const color = prev ? "orange" : PRIMARY_COLOR;
      prev = !prev;

      timeoutArray1[i] = setTimeout(() => {
        bars[barTwo].style.backgroundColor = color;
      }, i * ANIMATION_SPEED);
    } else {
      setTimeout(() => {
        // swap the two bars
        bars[barTwo].style.backgroundColor = "orange";
        bars[barOne].style.backgroundColor = PRIMARY_COLOR;

        // swap two heights
        const tempHeight = bars[barOne].style.height;
        bars[barOne].style.height = bars[barTwo].style.height;
        bars[barTwo].style.height = tempHeight;

        if (texts.length) {
          const tempVal = texts[barOne].textContent;
          texts[barOne].textContent = texts[barTwo].textContent;
          texts[barTwo].textContent = tempVal;
        }
      }, i * ANIMATION_SPEED);
    }
  }

  setTimeoutID1(timeoutArray1);

  for (let i = 0; i < bars.length; i++) {
    timeoutArray2[i] = setTimeout(() => {
      bars[i].style.backgroundColor = "green";
    }, animations.length * ANIMATION_SPEED + i * ANIMATION_SPEED);
  }

  setTimeoutID2(timeoutArray2);
};

export const animateThisQuick = (
  setTimeoutID1: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  setTimeoutID2: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  num: number,
  animations: number[][]
) => {
  if (typeof window === "undefined") return;

  const bars = document.getElementsByClassName(
    "bars"
  ) as unknown as Array<HTMLDivElement>;
  const texts = document.getElementsByClassName(
    "heightText"
  ) as unknown as Array<HTMLDivElement>;

  const timeoutArray1 = new Array<NodeJS.Timeout>(animations.length);
  const timeoutArray2 = new Array<NodeJS.Timeout>(bars.length);
  let prev = true;

  for (let i = 0; i < animations.length; i++) {
    const [type, barOne, barTwo] = animations[i];
    if(type === -1) {
      timeoutArray1[i] = setTimeout(() => {
        bars[barOne].style.backgroundColor = "orange";
      }, i*ANIMATION_SPEED);
    }
    else if(type === -2) {
      const color = bars[barOne].style.backgroundColor === "red" ? SECONDARY_COLOR : PRIMARY_COLOR;
      timeoutArray1[i] = setTimeout(() => {
        bars[barOne].style.backgroundColor = color;
        bars[barTwo].style.backgroundColor = color;
      }, i*ANIMATION_SPEED);
    }
    else if(type === -3) {
      const color = bars[barOne].style.backgroundColor === "red" ? SECONDARY_COLOR : PRIMARY_COLOR;
      timeoutArray1[i] = setTimeout(() => {
        bars[barOne].style.backgroundColor = color;
        bars[barTwo].style.backgroundColor = color;

        const tempVal = bars[barOne].style.height;
        bars[barOne].style.height = `${bars[barTwo].style.height}`;
        bars[barTwo].style.height = `${tempVal}`;

        if (texts.length) {
          const textTemp = texts[barOne].textContent;
          texts[barOne].textContent = texts[barTwo].textContent;
          texts[barTwo].textContent = textTemp;
        }
      }, i*ANIMATION_SPEED);
    }
  }

  setTimeoutID1(timeoutArray1);

  for (let i = 0; i < bars.length; i++) {
    timeoutArray2[i] = setTimeout(() => {
      bars[i].style.backgroundColor = "green";
    }, animations.length * ANIMATION_SPEED + i * ANIMATION_SPEED);
  }

  setTimeoutID2(timeoutArray2);
};
