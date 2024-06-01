import React from "react";
import { useGlobalContext } from "../utils/globalProvider";

const heightCalc = (num: number, min: number, max: number) =>
  10 + ((num - min) * ((3 * window.innerHeight) / 4 - 10)) / (max - min);

export default function MergeSort() {
  const {
    arr,
    setNum,
    num,
    timeoutID1,
    timeoutID2,
    setTimeoutID1,
    setTimeoutID2,
  } = useGlobalContext();

  const SECONDARY_COLOR = "red",
    PRIMARY_COLOR = "turquoise";
  const ANIMATION_SPEED = 10;
  const useThisArr = [...arr];

  if (timeoutID1) {
    timeoutID1.forEach((element) => {
      clearTimeout(element);
    });
    setTimeoutID1(null);

    if (timeoutID2) {
      timeoutID2.forEach((element) => {
        clearTimeout(element);
      });
      setTimeoutID2(null);
    }
    
    const temp = num;
    setNum(() => 0);
    setNum(() => temp);
  }

  const animations: number[][] = mergeSort(arr);

  const bars = (document.getElementsByClassName("bars") as unknown) as Array<HTMLDivElement>;
  setTimeoutID1(new Array<NodeJS.Timeout>(arr.length));
  setTimeoutID2(new Array<NodeJS.Timeout>(bars.length));

  let tempArr = new Array<NodeJS.Timeout>(arr.length);
  for (let i = 0; i < animations.length; i++) {
    // Every 3rd animation is the comparison
    if (i % 3 !== 2) {
      const [barOne, barTwo] = animations[i];

      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      
      tempArr[i] = setTimeout(() => {
        bars[barOne].style.backgroundColor = color;
        bars[barTwo].style.backgroundColor = color;
      }, i * ANIMATION_SPEED);
    } else {
      tempArr[i] = setTimeout(() => {
        const [barOne, newHeight] = animations[i];
        bars[barOne].style.height = `${heightCalc(newHeight, 10, 100)}px`;
      }, i * ANIMATION_SPEED);
    }
  }

  setTimeoutID1(tempArr);
  let temp = new Array<NodeJS.Timeout>(bars.length);

  for (let i = 0; i < bars.length; i++) {
    tempArr[i] = setTimeout(() => {
      bars[i].style.backgroundColor = "green";
    }, animations.length * ANIMATION_SPEED + i * ANIMATION_SPEED);
  }

  setTimeoutID2(temp);

  return <div></div>;
}

const mergeSort = (arr: Array<number>): number[][] => {
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