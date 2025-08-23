import { useState } from "react";

const PAGE_SIZE = 10;

const Pagination = ({ data, renderRow }) => {

  const [currentPage, setCurrentpage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const startIndex = (currentPage - 1) * pageSize;
  const EndIndex = currentPage * pageSize;
  const totalPage = Math.ceil(data.length / pageSize);

  const VisibleData = data.slice(startIndex, EndIndex);

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentpage(currentPage - 1);
    }
  }

  function handleNext() {
    if (totalPage > currentPage) {
      setCurrentpage(currentPage + 1);
    }
  }

  return (
    <div>
      <select
        onChange={(e) => setPageSize(Number(e.target.value))}
        name="pageSize"
        id="pageSize"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
      </select>
      <div>
        {VisibleData.map((d) => {
          return <div key={d}>{renderRow(d)}</div>;
        })}
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        <button onClick={() => setCurrentpage(1)} disabled={currentPage === 1}>
          First
        </button>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        {new Array(totalPage).fill("").map((_, index) => {
          return (
            <button onClick={() => setCurrentpage(index + 1)} key={index} disabled={currentPage === index + 1}>
              {index + 1}
            </button>
          );
        })}
        <button onClick={handleNext} disabled={currentPage === totalPage}>
          Next
        </button>
        <button
          onClick={() => setCurrentpage(totalPage)}
          disabled={currentPage === totalPage}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;
