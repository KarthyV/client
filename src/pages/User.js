import {
  Box,
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context";
import axios from "../api";
import { toast } from "react-toastify";

const User = () => {
  const { user, setUser } = useContext(MyContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
    else {
      setName(user.name);
      setEmail(user.email);
      setGender(user.gender);
      setAge(user?.age);
      setBirthDate(user?.birthDate);
      setBirthMonth(user?.birthMonth);
      setBirthYear(user?.birthYear);
      setMobile(user?.mobile);
    }
  }, [user]);

  const handleGenderChange = (e) => {
    e.preventDefault();
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      name,
      email,
      gender,
      age,
      birthDate,
      birthMonth,
      birthYear,
      mobile,
    };
    axios
      .patch(`/user/${user._id}`, { values })
      .then(({ data }) => {
        localStorage.setItem("guvi-user", JSON.stringify(data));
        setUser(data);
        toast("Updated Successfully");
      })
      .catch((err) => console.log(err));
  };

  if (!user) return <div>Loading...</div>;
  if (user) {
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
            Welcome {user?.name}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  fullWidth
                  id="name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  fullWidth
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue={user.gender}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    onChange={handleGenderChange}
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    onChange={handleGenderChange}
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                    onChange={handleGenderChange}
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="age"
                  label="Age"
                  type="number"
                  fullWidth
                  value={age}
                  onChange={(e) => setAge(+e.target.value)}
                />
              </Grid>
              <Grid sm={4} item xs={12}>
                <TextField
                  id="date"
                  label="Date"
                  type="number"
                  value={birthDate}
                  onChange={(e) => setBirthDate(+e.target.value)}
                />
              </Grid>
              <Grid sm={4} item xs={12}>
                <TextField
                  id="month"
                  label="Month"
                  type="number"
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(+e.target.value)}
                />
              </Grid>
              <Grid sm={4} item xs={12}>
                <TextField
                  id="year"
                  label="Year"
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(+e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="mobile"
                  label="Mobile number"
                  value={mobile}
                  fullWidth
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
};

export default User;
