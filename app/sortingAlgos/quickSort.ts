import { Dispatch, SetStateAction } from "react";
import { animateThisQuick, stopAnimations } from "../utils/helperFuncs";

export const quickSort = (
  timeoutID1: NodeJS.Timeout[] | null,
  timeoutID2: NodeJS.Timeout[] | null,
  setTimeoutID1: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  setTimeoutID2: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  arr: number[],
  num: number
) => {
  stopAnimations(timeoutID1, timeoutID2, setTimeoutID1, setTimeoutID2);

  const animations: number[][] = quickSort2([...arr]);

  animateThisQuick(setTimeoutID1, setTimeoutID2, num, animations);
};

const quickSort2 = (arr: number[]): number[][] => {
  const animations: number[][] = new Array<Array<number>>();

  quickSortHelper(arr, animations, 0, arr.length - 1);
	console.log("Animations: ", animations);
	
  return animations;
};


/* 
  1. Choose pivot                [-1, pivot]
  2. compare start and pivot     [-2, start, pivot];
  2. compare end and pivot       [-3, end, pivot];
  3. swap if needed              [-4, start, end];
*/
const quickSortHelper = (
  arr: number[],
  animations: number[][],
  start: number,
  end: number
) => {
  if (start >= end) return;

  var pivot = start + Math.floor(Math.random() * (end - start + 1));
  animations.push([-1, pivot, pivot]);
  while (start < end) {
    while (arr[start] <= arr[pivot]) {
      animations.push([-2, start, pivot]);
      animations.push([-2, start, pivot]);
      start++;
    }

    while (arr[end] > arr[pivot]) {
      animations.push([-2, end, pivot]);
      animations.push([-2, end, pivot]);
      end--;
    }

    if (start < end) {
      animations.push([-3, start, end]);
      animations.push([-3, start, end]);
      animations.push([-1, pivot, pivot]);
      const temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
    }
  }

  quickSortHelper(arr, animations, start, pivot);
  quickSortHelper(arr, animations, pivot + 1, end);
};
