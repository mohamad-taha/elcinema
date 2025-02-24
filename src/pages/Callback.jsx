import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { useTranslation } from "react-i18next";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AuthSnackbar = ({ msg, stat }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={stat}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
};

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const requestToken = searchParams.get("request_token");
    const approved = searchParams.get("approved");

    if (approved === "true" && requestToken) {
      const createSession = async () => {
        try {
          const sessionOptions = {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
            },
            body: JSON.stringify({ request_token: requestToken }),
          };

          const response = await fetch(
            "https://api.themoviedb.org/3/authentication/session/new",
            sessionOptions
          );

          const data = await response.json();

          if (response.ok && data.success) {
            localStorage.setItem("session_id", data.session_id);

            const accountOptions = {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjk0ZDY3ZDliNDRmZTg2MzQ4YzQxNDQ2MzYwNGJhZiIsIm5iZiI6MTczODk2NDQxOC44OCwic3ViIjoiNjdhNjdkYzJiOTM2MGMzZTMzZTA0Y2Y2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hd5hp2e1tnTMf1_-rWLb_dP7805RxMN1iegzGoFKf0c",
              },
            };

            const getInfo = await fetch(
              `https://api.themoviedb.org/3/account?session_id=${data.session_id}`,
              accountOptions
            );

            const user = await getInfo.json();

            if (getInfo.ok) {
              localStorage.setItem("user", JSON.stringify(user));
            }

            setAuth("success");
            setTimeout(() => navigate("/"), 1000);
          }
        } catch (error) {
          setAuth("error");
          setTimeout(() => navigate("/"), 1000);
        }
      };

      createSession();
    } else {
      setAuth("error");
      setTimeout(() => navigate("/"), 1000);
    }
  }, [searchParams, navigate, t]);

  return (
    <>
      {auth === null && <Loading />}
      {auth === "success" && (
        <AuthSnackbar stat="success" msg={t("auth_success")} />
      )}
      {auth === "error" && <AuthSnackbar stat="error" msg={t("auth_error")} />}
    </>
  );
};

export default Callback;
