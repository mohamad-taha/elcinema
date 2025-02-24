import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GoPerson } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const AccountBtn = () => {
  const location = useLocation();
  const [icn, setIcn] = useState(false);
  const [err, setErr] = useState({ stat: false, msg: "" });
  const { t } = useTranslation();

  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  }, [location.pathname]);

  const signIn = async () => {
    if (!localStorage.getItem("session_id")) {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
          },
        };

        const resp = await fetch(
          "https://api.themoviedb.org/3/authentication/token/new",
          options
        );
        const data = await resp.json();

        if (data.success) {
          window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${window.location.origin}/elcinema/callback`;
        }

        if (!resp.ok) {
          setErr(() => ({
            stat: true,
            msg: resp.statusText,
          }));
        }
      } catch (error) {
        setErr(() => ({
          stat: true,
          msg:
            error.message === "Failed to fetch" ? t("err_msg") : error.message,
        }));
      }
    } else {
      const sessionId = localStorage.getItem("session_id");

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/authentication/session",
          {
            method: "DELETE",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
            },
            body: JSON.stringify({ session_id: sessionId }),
          }
        );

        const data = await response.json();
        if (response.ok && data.success) {
          localStorage.removeItem("session_id");
          localStorage.removeItem("user");
          window.location.reload();
        }
      } catch (error) {
        alert(t("logout_err"));
      }
    }
  };

  return (
    <>
      <button
        style={{
          direction: "ltr",
          width: user !== null ? "120px" : "max-content",
          position: "relative",
        }}
        onMouseOver={() => user && setIcn(true)}
        onMouseLeave={() => user && setIcn(false)}
        onClick={signIn}
        className="accountBtn linksBtn"
        aria-label="account button"
      >
        {user !== null ? user.username : <GoPerson fontSize={25} />}
        <IoLogOutOutline
          style={{
            transition: "200ms",
            transform: icn ? "translateX(0)" : "translateX(-20%)",
            opacity: icn ? "1" : "0",
            position: "absolute",
            right: "0",
          }}
          fontSize={25}
        />
      </button>
      {err.stat && <span>{err.msg}</span>}
    </>
  );
};

export default AccountBtn;
