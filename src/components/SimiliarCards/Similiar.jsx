import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../Cards/Card";
import Pagination from "../Pagination/ItemsPagination";
import { ThemeProvider } from "@emotion/react";
import { Theme } from "../../theme/Theme";
import { useTranslation } from "react-i18next";

const Similar = () => {
  const { t, i18n } = useTranslation();
  const { type, id } = useParams();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState({ stat: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPagination, setItemsPagination] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErr({ stat: false, msg: "" });

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/similar?language=${i18n.language}&page=${itemsPagination}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
            },
          }
        );

        if (!response.ok) {
          setErr({
            stat: true,
            msg: response.statusText,
          });
        }

        const data = await response.json();
        setItems(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        setErr({
          stat: true,
          msg:
            error.message === "Failed to fetch" ? t("err_msg") : error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type, itemsPagination, i18n.language]);

  return (
    <ThemeProvider theme={Theme}>
      <div className="mt">
        <h1 style={{ fontSize: "38px" }}>{t("similiar")}</h1>
        <Cards items={items} err={err} loading={loading} type={type} />
        <Pagination
          pages={totalPages}
          setItemsPagination={setItemsPagination}
        />
      </div>
    </ThemeProvider>
  );
};

export default Similar;
