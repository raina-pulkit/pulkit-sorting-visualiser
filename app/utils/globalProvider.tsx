"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ContextProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  changeByArr: boolean;
  setChangeByArr: Dispatch<SetStateAction<boolean>>;
  changeByNum: boolean;
  setChangeByNum: Dispatch<SetStateAction<boolean>>;
  num: number;
  setNum: Dispatch<SetStateAction<number>>;
  arr: number[];
  setArr: Dispatch<SetStateAction<number[]>>;
  elements: HTMLDivElement[];
  setElements: Dispatch<SetStateAction<HTMLDivElement[]>>;
  timeoutID1: NodeJS.Timeout[] | null;
  timeoutID2: NodeJS.Timeout[] | null;
  setTimeoutID1: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>;
  setTimeoutID2: Dispatch<SetStateAction<NodeJS.Timeout[] | null>>;
};

const defaultVals = {
  show: false,
  setShow: () => {},
  changeByArr: false,
  setChangeByArr: () => {},
  changeByNum: false,
  setChangeByNum: () => {},
  num: 0,
  setNum: () => {},
  arr: [],
  setArr: () => {},
  elements: [],
  setElements: () => {},
  timeoutID1: null,
  timeoutID2: null,
  setTimeoutID1: () => {},
  setTimeoutID2: () => {},
};

const Context = createContext<ContextProps>(defaultVals);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [arr, setArr] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);
  const [elements, setElements] = useState<HTMLDivElement[]>([]);
  const [num, setNum] = useState(20);
  const [timeoutID1, setTimeoutID1] = useState<Array<NodeJS.Timeout> | null>(
    null
  );
  const [timeoutID2, setTimeoutID2] = useState<Array<NodeJS.Timeout> | null>(
    null
  );
  const [changeByArr, setChangeByArr] = useState(false);
  const [changeByNum, setChangeByNum] = useState(false);

  return (
    <Context.Provider
      value={{
        show,
        setShow,
        num,
        setNum,
        arr,
        setArr,
        elements,
        setElements,
        timeoutID1,
        timeoutID2,
        setTimeoutID1,
        setTimeoutID2,
        changeByArr,
        setChangeByArr,
        changeByNum,
        setChangeByNum,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => useContext(Context);
