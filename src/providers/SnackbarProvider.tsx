import { ReactNode } from 'react';
import {
  MaterialDesignContent,
  SnackbarKey,
  SnackbarProvider as NotistackSnackbarProvider,
  useSnackbar
} from "notistack";
import { IconButton, styled } from "@mui/material";
import { Close } from "@mui/icons-material";

function SnackbarCloseButton({ snackbarKey }: { snackbarKey: SnackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton variant={'circular'} onClick={() => closeSnackbar(snackbarKey)} sx={{ color: 'white' }}>
      <Close />
    </IconButton>
  );
}

const DefaultMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
  '&.notistack-MuiContent-default': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.triadic[700] : theme.palette.primary[600],
  },
}))

const SuccessMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: theme.palette.mode === 'dark' ? '#526863' : '#429887',
  },
}))

const ErrorMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-error': {
    maxWidth: 500,
  }
}))

const InfoMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
  '&.notistack-MuiContent-info': {
    backgroundColor: theme.palette.primary.main,
  },
}))

function SnackbarProvider({ children }: { children: ReactNode }) {
  return (
    <NotistackSnackbarProvider
      Components={{
        default: DefaultMaterialDesignContent,
        success: SuccessMaterialDesignContent,
        error: ErrorMaterialDesignContent,
        info: InfoMaterialDesignContent,
      }}
      action={snackbarKey => <SnackbarCloseButton snackbarKey={snackbarKey} /> }>
      {children}
    </NotistackSnackbarProvider>
  );
}

export default SnackbarProvider;