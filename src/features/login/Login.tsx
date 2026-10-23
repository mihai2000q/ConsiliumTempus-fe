import { Box, Button, Checkbox, Paper, Stack, TextField, Typography } from '@mui/material'
import PasswordTextField from '../../components/textfield/PasswordTextField.tsx'
import demoPicture from '../../assets/demo-picture.png'
import demoLogo from '../../assets/demo-logo.png'
import { useFormik } from 'formik'
import { validationSchema } from './state/loginValidation.ts'
import { AppDispatch } from '../../state/store.ts'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from './state/loginApi.ts'
import { LoginForm, loginFormInitialValues } from './state/loginState.ts'
import { setRefreshToken, setToken } from '../../state/auth/authSlice.ts'
import { Link, useLocation, useNavigate } from 'react-router'
import Paths from '../../utils/enums/Paths.ts'
import HttpErrorResponse from '../../types/responses/HttpError.response.ts'

function Login() {
  const dispatch = useDispatch<AppDispatch>()

  const [login, { error, isError, isLoading }] = useLoginMutation()
  const loginError = (error as HttpErrorResponse | undefined)?.data

  const navigate = useNavigate()
  const location = useLocation()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: loginFormInitialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmitForm
  })

  async function handleSubmitForm(values: LoginForm) {
    const { email, password } = values
    try {
      const res = await login({ email, password }).unwrap()

      dispatch(setToken(res.token))
      dispatch(setRefreshToken(res.refreshToken))
      navigate(location.state?.from?.pathname ?? Paths.Home)
    } catch {
      /* empty */
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      <Paper>
        <Stack direction={'row'}>
          <Stack
            sx={{
              gap: 3,
              mx: 8,
              my: 4
            }}
          >
            <Stack
              direction={'row'}
              sx={{
                alignItems: 'center',
                pb: 4
              }}
            >
              <img src={demoLogo} alt={'logo'} width={50} />
              <Typography
                sx={{
                  fontWeight: 700,
                  ml: 1,
                  fontSize: 18
                }}
              >
                Some Logo
              </Typography>
            </Stack>

            <Stack
              sx={{
                gap: 2
              }}
            >
              <Typography variant={'h5'}>
                Login to <strong>Consilium Tempus</strong>
              </Typography>
              <Typography variant={'body2'}>lorem lorem lorem lorem lorem lorem</Typography>
            </Stack>

            <form onSubmit={handleSubmit}>
              <Stack
                sx={{
                  gap: 2
                }}
              >
                <TextField
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputMode={'email'}
                  name={'email'}
                  label={'Email'}
                  placeholder={'Enter your email'}
                  error={(touched.email && !!errors.email) || isError}
                  helperText={(touched.email && errors.email) || (isError && loginError?.title)}
                  slotProps={{
                    htmlInput: { maxLength: 256 }
                  }}
                />

                <PasswordTextField
                  value={values.password}
                  onChange={handleChange}
                  maxLength={100}
                  onBlur={handleBlur}
                  error={(touched.password && !!errors.password) || isError}
                  helperText={
                    (touched.password && errors.password) || (isError && loginError?.title)
                  }
                />

                <Stack
                  direction={'row'}
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Stack
                    direction={'row'}
                    sx={{
                      alignItems: 'center'
                    }}
                  >
                    <Checkbox value={values.rememberMe} onChange={handleChange} />
                    <Typography variant={'subtitle1'}>Remember me</Typography>
                  </Stack>
                  <Typography
                    variant={'body2'}
                    sx={{
                      fontWeight: 600
                    }}
                  >
                    Forgot Password?
                  </Typography>
                </Stack>

                <Button variant={'contained'} type={'submit'} disabled={isLoading}>
                  Login
                </Button>
              </Stack>
            </form>

            <Stack
              direction={'row'}
              sx={{
                justifyContent: 'center'
              }}
            >
              <Stack direction={'row'}>
                <Typography
                  sx={{
                    mr: 1
                  }}
                >
                  Not a member yet?
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600
                  }}
                >
                  <Link to={Paths.Signup} style={{ color: 'white', textDecoration: 'none' }}>
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
  )
}

export default Login
