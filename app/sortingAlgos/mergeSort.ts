import { Dispatch, SetStateAction } from "react";
import { stopAnimations, animateThisMerge } from "../utils/helperFuncs";

export const mergeSort = (
  timeoutID1: NodeJS.Timeout[] | null,
  timeoutID2: NodeJS.Timeout[] | null,
  setTimeoutID1: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  setTimeoutID2: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  arr: number[],
  num: number
) => {
  stopAnimations(timeoutID1, timeoutID2, setTimeoutID1, setTimeoutID2);

  const animations: number[][] = mergeSort2([...arr]);

  animateThisMerge(
    setTimeoutID1,
    setTimeoutID2,
    num,
    arr,
    animations
  );
};

const mergeSort2 = (arr: Array<number>): number[][] => {
  const animations: number[][] = [];
  if (arr.length <= 1) return animations;

  const duplicateArr = arr.slice();
  mergeSortHelper(arr, 0, arr.length - 1, duplicateArr, animations);

  return animations;
};

const mergeSortHelper = (
  arr: Array<number>,
  startIdx: number,
  endIdx: number,
  duplicateArr: Array<number>,
  animations: number[][]
) => {
  if (startIdx >= endIdx) return;
  const mid = startIdx + Math.floor((endIdx - startIdx) / 2);

  mergeSortHelper(arr, startIdx, mid, duplicateArr, animations);
  mergeSortHelper(arr, mid + 1, endIdx, duplicateArr, animations);
  doMerge(arr, startIdx, endIdx, mid, duplicateArr, animations);
};

const doMerge = (
  arr: Array<number>,
  startIdx: number,
  endIdx: number,
  midIdx: number,
  duplicateArr: Array<number>,
  animations: number[][]
) => {
  let k = startIdx,
    i = startIdx,
    j = midIdx + 1;

  while (i <= midIdx && j <= endIdx) {
    // Push first time to change color showing we are comparing these two values
    animations.push([i, j]);
    // Push second time to change color back to original
    animations.push([i, j]);

    if (duplicateArr[i] <= duplicateArr[j]) {
      animations.push([k, duplicateArr[i]]);
      arr[k++] = duplicateArr[i++];
    } else {
      animations.push([k, duplicateArr[j]]);
      arr[k++] = duplicateArr[j++];
    }
  }

  while (i <= midIdx) {
    animations.push([i, i]);
    animations.push([i, i]);

    animations.push([k, duplicateArr[i]]);
    arr[k++] = duplicateArr[i++];
  }

  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);

    animations.push([k, duplicateArr[j]]);
    arr[k++] = duplicateArr[j++];
  }

  for (let i = startIdx; i <= endIdx; i++) duplicateArr[i] = arr[i];
};
