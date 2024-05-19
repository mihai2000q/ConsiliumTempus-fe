import { Box, Button, Checkbox, Paper, Stack, TextField, Typography } from "@mui/material";
import PasswordTextField from "../../components/textfield/PasswordTextField.tsx";
import demoPicture from '../../assets/demo-picture.png'
import demoLogo from '../../assets/demo-logo.png'
import { useFormik } from "formik";
import { validationSchema } from "./state/loginValidation.ts";
import { AppDispatch, RootState } from "../../state/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { setLoginForm } from "./state/loginSlice.ts";
import { useLoginMutation } from "./state/loginApi.ts";
import { LoginForm, loginFormInitialValues } from "./state/loginState.ts";
import AuthResponse from "../../types/Auth.response.ts";
import { setRefreshToken, setToken } from "../../state/auth/authSlice.ts";
import { Link, useNavigate } from "react-router-dom";
import Paths from "../../utils/Paths.ts";
import HttpErrorResponse from "../../types/HttpError.response.ts";

function Login() {
  const loginForm = useSelector((state: RootState) => state.login.loginForm)
  const dispatch = useDispatch<AppDispatch>()

  const [login, loginMutation] = useLoginMutation()
  const loginError = (loginMutation.error as HttpErrorResponse | undefined)?.data

  const navigate = useNavigate()

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues: loginForm,
    validationSchema: validationSchema,
    onSubmit: handleSubmitForm
  })

  async function handleSubmitForm(values: LoginForm) {
    dispatch(setLoginForm(values))
    const { email, password } = values
    try {
      let authRes = await login({ email, password }).unwrap()

      if ((authRes as HttpErrorResponse).data !== undefined) return

      authRes = authRes as AuthResponse
      dispatch(setToken(authRes.token))
      dispatch(setRefreshToken(authRes.refreshToken))
      dispatch(setLoginForm(loginFormInitialValues))
      navigate(Paths.home)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box
      display={'flex'}
      justifyContent={"center"}
      alignItems={"center"}
      width={'100%'}
      height={'100%'}>
      <Paper>
        <Stack direction={"row"}>
          <Stack gap={3} mx={8} my={4}>
            <Stack direction={"row"} alignItems={'center'} pb={4}>
              <img src={demoLogo} alt={'logo'} width={50} />
              <Typography fontWeight={700} ml={1} fontSize={18}>Some Logo</Typography>
            </Stack>
            <Stack gap={2}>
              <Typography variant={'h5'}>Login to <strong>Consilium Tempus</strong></Typography>
              <Typography variant={'body2'}>lorem lorem lorem lorem lorem lorem</Typography>
            </Stack>
            <form onSubmit={handleSubmit}>
              <Stack gap={2}>
                <TextField
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name={'email'}
                  label={'Email'}
                  placeholder={'Enter your email'}
                  error={touched.email && !!errors.email || loginMutation.isError}
                  helperText={touched.email && errors.email || loginMutation.isError && loginError?.title} />
                <PasswordTextField
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && !!errors.password || loginMutation.isError}
                  helperText={touched.password && errors.password || loginMutation.isError && loginError?.title} />
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={'center'}>
                  <Stack direction={"row"} alignItems={"center"}>
                    <Checkbox value={values.rememberMe} onChange={handleChange} />
                    <Typography variant={"subtitle1"}>Remember me</Typography>
                  </Stack>
                  <Typography fontWeight={600} variant={'body2'}>Forgot Password?</Typography>
                </Stack>
                <Button
                  variant={'contained'}
                  type={"submit"}
                  disabled={loginMutation.isLoading}
                  sx={{
                    textTransform: 'none'
                  }}>
                  Login
                </Button>
              </Stack>
            </form>
            <Stack direction={"row"} justifyContent={'center'}>
              <Stack direction={"row"}>
                <Typography mr={1}>Not a member yet?</Typography>
                <Typography fontWeight={600}>
                  <Link to={Paths.signup} style={{ color: 'white', textDecoration: 'none' }}>
                    Join Us
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <img src={demoPicture} width={750} height={650} alt={'demo-picture'} />
        </Stack>
      </Paper>
    </Box>
  );
}

export default Login;