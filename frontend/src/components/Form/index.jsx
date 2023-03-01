import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { getApiHandler, postApiHandler, putApiHandler } from "../../apiHandler";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "../../layout";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const theme = createTheme();

const UserForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(true);
  };
  const id = useSearchParams()[0].get("id");
  console.log("jhgfd: ", useSearchParams());
  const history = useNavigate();

  const prefilledForm = async () => {
    handleToggle();
    const result = await getApiHandler(`/?id=${id}`);
    if (result.status == 200) {
      const { name, email, age, contact } = result.response;
      console.log("prefilled: ", result.response);
      setValue("name", name);
      setValue("email", email);
      setValue("contact", contact);
      setValue("age", age);
    }
    handleClose();
  };
  useEffect(() => {
    if (id) {
      prefilledForm();
    }
  }, [id]);

  const onSubmit = async (values) => {
    handleToggle();
    const result = id
      ? await putApiHandler(`/${id}`, values)
      : await postApiHandler("/", values);
    console.log("onSubmit: ", result);
    handleClose();
    history("/contactlist");
  };

  return (
    <MainLayout>
      {open ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                {/* <ContactsIcon /> */}
                <AddCircleOutlineIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {id ? "UPDATE GRAHAK" : "ADD GRAHAK"}
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="name"
                      required
                      fullWidth
                      label="Title"
                      type="text"
                      {...register("name")}
                      {...register("name", {
                        required: {
                          value: true,
                          message: "name is required",
                        },

                      })}
                      error={!!errors?.name}
                      helperText={errors?.name?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="ChannelName"
                      name="email"
                      type="email"
                      {...register("email")}
                      {...register("email", {
                        required: {
                          value: true,
                          message: "email is required",
                        }

                      })}
                      error={!!errors?.email}
                      helperText={errors?.email?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="contact"
                      label="ShowTime"
                      type="text"
                      {...register("contact")}
                      {...register("contact", {
                        required: {
                          value: true,
                          message: "contact is required",
                        },
                        minlength: {
                          value: 10,
                          message: "min value is 10",
                        },



                      })}
                      error={!!errors?.contact}
                      helperText={errors?.contact?.message}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {id ? "Update" : "Add"}
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </MainLayout>
  );
};

export default UserForm;
