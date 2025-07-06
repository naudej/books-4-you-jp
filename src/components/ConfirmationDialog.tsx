import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const ConfirmDialog = ({ open, onClose, onConfirm, title, description }: ConfirmDialogProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="confirm-dialog-title"
    aria-describedby="confirm-dialog-description"
  >
    <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="confirm-dialog-description">{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button aria-label="Cancel dialog" onClick={onClose}>
        Cancel
      </Button>
      <Button aria-label="Confirm dialog" onClick={onConfirm} autoFocus={true}>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);
export default ConfirmDialog;
