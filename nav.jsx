import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSort } from "@fortawesome/free-solid-svg-icons";

function Sort({ value }) {
  return <h3 className="sortNames">{value}</h3>;
}
function Heading({ value }) {
  return <h2 className="headingNames">{value}</h2>;
}

function SideNavBar() {
  return (
    <div className="full">
      <h2 className="home">
        <FontAwesomeIcon icon={faHome} style={{ color: "orange" }} /> Home
      </h2>
      <hr className="separator" />
      <h2 className="sort">
        <FontAwesomeIcon icon={faSort} style={{ color: "orange" }} /> Sorts
      </h2>
      <Heading value="LOGARITHMIC" />
      <Sort value="Merge Sort" />
      <Sort value="Quick Sort" />
      <Sort value="Heap Sort" />
      <Heading value="QUADRATIC" />
      <Sort value="Bubble Sort" />
      <Sort value="Selection Sort" />
      <Sort value="Insertion Sort" />
      <Heading value="WEIRD" />
      <Sort value="Bitonic Sort" />
      <Sort value="Radix Sort" />
    </div>
  );
}
export default SideNavBar;
