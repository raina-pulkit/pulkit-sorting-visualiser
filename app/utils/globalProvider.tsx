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
  const [arr, setArr] = useState<number[]>([]);
  const [elements, setElements] = useState<HTMLDivElement[]>([]);
  const [num, setNum] = useState(10);
  const [timeoutID1, setTimeoutID1] = useState<Array<NodeJS.Timeout> | null>(
    []
  );
  const [timeoutID2, setTimeoutID2] = useState<Array<NodeJS.Timeout> | null>(
    []
  );

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => useContext(Context);
