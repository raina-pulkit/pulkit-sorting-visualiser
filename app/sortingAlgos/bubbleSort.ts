import { Dispatch, SetStateAction } from "react";
import { animateThisBubble, stopAnimations } from "../utils/helperFuncs";

export const bubbleSort = (
  timeoutID1: NodeJS.Timeout[] | null,
  timeoutID2: NodeJS.Timeout[] | null,
  setTimeoutID1: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  setTimeoutID2: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  arr: number[],
  num: number,
) => {
  stopAnimations(timeoutID1, timeoutID2, setTimeoutID1, setTimeoutID2);

  const animations: number[][] = bubbleSort2([...arr]);

  animateThisBubble(setTimeoutID1, setTimeoutID2, num, animations)
};

const bubbleSort2 = (arr: number[]): number[][] => {
	const n = arr.length;

	const animations: number[][] = new Array<Array<number>>;
	for(let i = 0; i < n - 1; i++) {
		for(let j = 0; j < n - i - 1; j++) {
			animations.push([j, j + 1]);
			animations.push([j, j + 1]);

			if(arr[j] > arr[j + 1]) {
				animations.push([j, j + 1]);
				const temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
			else animations.push([j + 1, j + 1]);
		}
	}

	return animations;
}
