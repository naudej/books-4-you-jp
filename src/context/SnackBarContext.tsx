import React, { createContext, useContext, useState, ReactNode } from 'react';
import Snackbar, { SnackbarProps as MuiSnackBarProps } from '@mui/material/Snackbar';
import Alert, { AlertProps as MuiAlertProps, AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Slide from '@mui/material/Slide';

const DEFAULT_SNACKBAR_CONFIG: BookSnackbarProps = {
  message: '',
  type: 'success',
  variant: 'filled',
  autoHideDuration: 5000,
};

type SnackbarProps = Pick<MuiSnackBarProps, 'open' | 'autoHideDuration' | 'anchorOrigin'>;
type AlertProps = Pick<MuiAlertProps, 'icon' | 'variant' | 'role' | 'color' | 'action'>;

export type BookSnackbarProps = {
  message: string;
  type: AlertColor;
  alertTitle?: string;
} & Partial<SnackbarProps & AlertProps>;

type SnackbarContextType = {
  showSnackbar: (props: BookSnackbarProps) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState<BookSnackbarProps>(DEFAULT_SNACKBAR_CONFIG);

  const showSnackbar = (props: BookSnackbarProps) => {
    setSnackbarConfig({ ...DEFAULT_SNACKBAR_CONFIG, ...props });
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const {
    message,
    type,
    autoHideDuration,
    anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
    variant = 'filled',
    icon,
    color,
    role,
    action,
    alertTitle,
  } = snackbarConfig;

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={autoHideDuration}
        anchorOrigin={anchorOrigin}
        slots={{ transition: Slide }}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant={variant}
          icon={icon}
          color={color}
          role={role}
          action={action}
          sx={{ width: '100%' }}
        >
          {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar is used outside of the SnackbarProvider');
  }
  return context;
};
