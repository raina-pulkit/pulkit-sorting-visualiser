import { Dispatch, SetStateAction } from "react";
import { animateThisSelection, stopAnimations } from "../utils/helperFuncs";

export const selectionSort = (
  timeoutID1: NodeJS.Timeout[] | null,
  timeoutID2: NodeJS.Timeout[] | null,
  setTimeoutID1: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  setTimeoutID2: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  arr: number[],
  num: number
) => {
  stopAnimations(timeoutID1, timeoutID2, setTimeoutID1, setTimeoutID2);

  const animations: number[][] = selectionSort2([...arr]);

  animateThisSelection(setTimeoutID1, setTimeoutID2, num, animations);
};

const selectionSort2 = (arr: number[]): number[][] => {
  const n = arr.length;
  const animations: number[][] = new Array<Array<number>>();

  for (let i = 0; i < n - 1; i++) {
    let minInd = i;
    animations.push([-1, i]); // -1 indicates that we make this bar orange (it is current minimum)
    animations.push([-1, i]);
    for (let j = i + 1; j < n; j++) {
      // first == second means we are comparing it currently

      if (arr[j] < arr[minInd]) {
		animations.push([-2, j]);
        animations.push([-2, j]);
        minInd = j;
      } else {
		animations.push([j, j]);
		animations.push([j, j]);
	  }
    }

    if (minInd != i) {
      // swap minInd and i
      animations.push([minInd, i]);
	  const temp = arr[minInd];
	  arr[minInd] = arr[i];
	  arr[i] = temp;
    }
  }

  return animations;
};
