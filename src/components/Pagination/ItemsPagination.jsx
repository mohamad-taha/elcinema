import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const PaginationCards = ({ pages, setItemsPagination }) => {
  const handlePageChange = (_, value) => {
    setItemsPagination(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <Pagination
        size="small"
        onChange={handlePageChange}
        count={pages}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: IoIosArrowBack, next: IoIosArrowForward }}
            {...item}
          />
        )}
      />
    </div>
  );
};
export default PaginationCards;
