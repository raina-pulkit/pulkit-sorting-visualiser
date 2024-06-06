import React from "react";

const Sorting = ({ params }: { params: { sort: string } }) => {
  const sort = params.sort;
  console.log("Sorting is: ", sort);

  return <div className="text-6xl text-white"></div>;
};

export default Sorting;
