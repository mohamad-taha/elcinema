import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../Cards/Card";
import Paginaition from "../Pagination/ItemsPagination";
import { ThemeProvider } from "@emotion/react";
import { Theme } from "../../theme/Theme";
import { useTranslation } from "react-i18next";

const Similiar = () => {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const { type, id } = useParams();
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
          `https://api.themoviedb.org/3/${type}/${id}/similar?language=${i18n.language}&page=${itemsPagination}`,
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
          msg: t("err_msg"),
        }));
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id, itemsPagination, i18n.language]);
  return (
    <ThemeProvider theme={Theme}>
      <div className="mt">
        <h1 style={{ fontSize: "38px" }}>{t("similiar")}</h1>
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
