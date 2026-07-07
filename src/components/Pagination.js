import React from "react";

function Pagination({ NextPage, PrevPage }) {
  return (
    <div className="BtnContainer">
      {PrevPage && (
        <button onClick={PrevPage} className="PaginationBtns">
          Previous
        </button>
      )}
      {NextPage && (
        <button onClick={NextPage} className="PaginationBtns">
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
