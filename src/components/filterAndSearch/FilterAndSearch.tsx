import "./filterAndSearch.scss";
import Filter from "../filter/Filter";
import Search from "../search/Search";

function FilterAndSearch() {
  return (
    <div className="filterAndSearch">
      <div className="container">
        <div className="filterAndSearch__inner">
          <Filter />
          <Search />
        </div>
      </div>
    </div>
  );
}

export default FilterAndSearch;
