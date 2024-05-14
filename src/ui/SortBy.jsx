/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

//type: 'white' is from the styled component
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  //get the value of the selected option
  const sortBy = searchParams.get("sortBy") || "";

  //make a function to handle which option is selected
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type='white'
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
