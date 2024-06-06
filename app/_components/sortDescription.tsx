import React from "react";
import SideNavBarBtn from "./sideNavBarBtn";

const SortDescription = () => {
  return (
    <div className="w-full bg-black opacity-90 min-h-screen px-20 py-16 text-white flex justify-center">
      <div className="w-4/5 text-2xl flex flex-col gap-8">
        <div className="text-4xl font-extrabold tracking-widest">
          Sorting Algorithms
        </div>
        <p>
          Sorting algorithms are used to sort a data structure according to a
          specific order relationship, such as numerical order or
          lexicographical order.
        </p>
        <p>
          This operation is one of the most important and widespread in computer
          science. For a long time, new methods have been developed to make this
          procedure faster and faster.
        </p>
        <p>
          There are currently hundreds of different sorting algorithms, each
          with its own specific characteristics. They are classified according
          to two metrics: space complexity and time complexity.
        </p>
        <p>
          Those two kinds of complexity are represented with asymptotic
          notations, mainly with the symbols O, Θ, Ω, representing respectively
          the upper bound, the tight bound, and the lower bound of the
          algorithm&apos;s complexity, specifying in brackets an expression in
          terms of n, the number of the elements of the data structure.
        </p>
        <p>Most of them fall into two categories:</p>
        <ul className="list-outside list-disc flex flex-col gap-6">
          <li className="ml-8">
            Logarithmic The complexity is proportional to the binary logarithm
            (i.e to the base 2) of n. An example of a logarithmic sorting
            algorithm is Quick sort, with space and time complexity O(n x log
            n).
          </li>
          <li className="ml-8">
            Quadratic The complexity is proportional to the square of n. An
            example of a quadratic sorting algorithm is Bubble sort, with a time
            complexity of O(n2).
          </li>
        </ul>
        <p>
          Space and time complexity can also be further subdivided into 3
          different cases: best case, average case and worst case.
        </p>
        <p>
          Sorting algorithms can be difficult to understand and it&apos;s easy
          to get confused. We believe visualizing sorting algorithms can be a
          great way to better understand their functioning while having fun!
        </p>
        <div className="flex justify-center items-center">
          <SideNavBarBtn styles={"w-32 text-2xl py-4"}>Sorts</SideNavBarBtn>
        </div>
      </div>
    </div>
  );
};

export default SortDescription;
