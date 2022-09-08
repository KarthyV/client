import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { MyContext } from "../context";
import axios from "../api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const formValidationSchema = yup.object({
  name: yup.string().required("User name must be provided"),
  email: yup.string().email().required("Please enter valid a email"),
  password: yup
    .string()
    .required("Please enter valid a password")
    .min(6, "Must be of min 6 letters"),
});

const Signup = () => {
  const { user, setUser } = useContext(MyContext);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCheck, setCheckPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate(`/user/${user._id}`);
  }, [user]);

  const { handleSubmit, handleChange, errors, handleBlur, touched, values } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        if (values.password !== confirmPassword) setCheckPassword(true);
        else {
          axios
            .post("/user/register", { values })
            .then((res) => {
              if (res.status === 201) {
                setUser(res.data);
                localStorage.setItem("guvi-user", JSON.stringify(res.data));
              } else {
                toast.error(res);
              }
            })
            .catch((error) => toast.error(error.response.data));
        }
      },
    });
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register Page
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                fullWidth
                id="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                error={errors.name && touched.name ? true : false}
                helperText={errors.name && touched.name ? errors.name : ""}
                onBlur={handleBlur}
              />
            </Grid>
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
              <TextField
                name="confirm-password"
                type="password"
                fullWidth
                id="confirm-password"
                label="confirm password"
                value={values.confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={passwordCheck ? true : false}
                helperText={passwordCheck ? "Password must be same" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link style={{ textDecoration: "none", color: "blue" }} to="/">
                Already have an account?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
