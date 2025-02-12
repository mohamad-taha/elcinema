import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../Cards/Card";
import Paginaition from "../Pagination/ItemsPagination";
import { ThemeProvider } from "@emotion/react";
import { Theme } from "../../theme/Theme";

const Similiar = () => {
  const [items, setItems] = useState([]);
  const { type, id, name } = useParams();
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState("");
  const [itemsPagination, setItemsPagination] = useState(1);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
      },
    };
    const getData = async () => {
      setLoading(true);
      try {
        const resp = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=${itemsPagination}`,
          options
        );
        const data = await resp.json();
        setItems(data.results);
        setTotalPages(50);
        if (!response.ok) {
          setErr(() => ({
            stat: true,
            msg: response.statusText,
          }));
        }
      } catch (error) {
        setErr(() => ({
          stat: true,
          msg: "No internet connection or an unknown error occurred!",
        }));
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id, itemsPagination]);
  return (
    <ThemeProvider theme={Theme}>
      <div className="mt">
        <h1 style={{ fontSize: "38px" }}>
          Similiar to
          <br />
          <span style={{ color: "var(--primary-color)" }}>{name}</span>
        </h1>
        <Cards items={items} err={err} loading={loading} type={type} />
        <Paginaition
          pages={totalPages}
          setItemsPagination={setItemsPagination}
        />
      </div>
    </ThemeProvider>
  );
};

export default Similiar;
