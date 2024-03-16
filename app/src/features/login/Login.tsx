import { Button, Stack, TextField } from "@mui/material";
import PasswordTextField from "../../components/textfield/PasswordTextField.tsx";
import { useState } from "react";

function Login() {
  const [password, setPassword] = useState('')

  function handleSubmit() {
    console.log(password)
  }

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      width={'100%'}
      height={'100%'}
      gap={2}>
      <TextField label={'Email'} placeholder={'Enter your email'}/>
      <PasswordTextField value={password} onValueChange={setPassword}/>
      <Button variant={'contained'} onClick={handleSubmit}>Login</Button>
    </Stack>
  );
}

export default Login;