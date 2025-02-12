import SearchBar from "../components/SearchBar/SearchBar";
import Cards from "../components/CategoriesCards/Cards";

const HomePage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        className="container mt"
      >
        <h1
          style={{
            fontSize: "50px",
            fontFamily: "jost",
            color: "var(--primary-color)",
            marginTop: "50px",
            cursor: "default",
            marginBottom: "20px",
          }}
        >
          Elcinema
        </h1>
        <SearchBar />
        <Cards />
      </div>
    </>
  );
};

export default HomePage;
