import { Dispatch, SetStateAction } from "react";
import { animateThisInsertion, stopAnimations } from "../utils/helperFuncs";

export const insertionSort = (
  timeoutID1: NodeJS.Timeout[] | null,
  timeoutID2: NodeJS.Timeout[] | null,
  setTimeoutID1: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  setTimeoutID2: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>,
  arr: number[], 
  num: number
) => {
  stopAnimations(timeoutID1, timeoutID2, setTimeoutID1, setTimeoutID2);

  const animations: number[][] = insertionSort2([...arr]);

  animateThisInsertion(setTimeoutID1, setTimeoutID2, animations);
};

const insertionSort2 = (arr: number[]): number[][] => {
	const n = arr.length;
	const animations: number[][] = new Array<Array<number>>;

	for(let i = 1; i < n; i++) {
		const key = arr[i];
		let j = i - 1;

		while(j >= 0 && arr[j] > key) {
			animations.push([j, j + 1]);
			animations.push([j, j + 1]);
			animations.push([j, j + 1]);
			
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = key;
	}

	return animations;
}