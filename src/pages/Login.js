import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { MyContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api";
import { toast } from "react-toastify";

const formValidationSchema = yup.object({
  email: yup.string().email().required("Please enter valid a email"),
  password: yup
    .string()
    .required("Please enter valid a password")
    .min(6, "Must be of min 6 letters"),
});

const Login = () => {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate(`/user/${user._id}`);
  }, [user]);
  const { handleSubmit, handleChange, errors, handleBlur, touched, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        axios
          .post("/user/login", { values })
          .then((res) => {
            if (res.status === 201) {
              setUser(res.data);
              localStorage.setItem("guvi-user", JSON.stringify(res.data));
              navigate(`/user/${res.data.user._id}`);
            } else {
              toast.error(res.data);
            }
          })
          .catch((error) => toast.error(error?.response?.data));
      },
    });

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login Page
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                fullWidth
                id="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                error={errors.email && touched.email ? true : false}
                helperText={errors.email && touched.email ? errors.email : ""}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                type="password"
                fullWidth
                id="password"
                label="password"
                value={values.password}
                onChange={handleChange}
                error={errors.password && touched.password ? true : false}
                helperText={
                  errors.password && touched.password ? errors.password : ""
                }
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link
                style={{ textDecoration: "none", color: "blue" }}
                to="/register"
              >
                Don't have an account?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
