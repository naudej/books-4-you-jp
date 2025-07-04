import { forwardRef, useState } from 'react';
import {
  Drawer,
  Button,
  Typography,
  Stack,
  IconButton,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputBaseComponentProps,
} from '@mui/material';
import { useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { IMaskInput } from 'react-imask';
import { BookFormFields, ISBN_TYPES } from '../data/types.ts';
import type { MaskedPattern } from 'imask';
import { HEIGHT_NAVBAR } from '../utils/constants.ts';
import ConfirmDialog from '../components/ConfirmationDialog.tsx';
import { bookValidationSchema } from './validationSchemas.ts';
import { useBookSubmit } from '../data/useBookSubmit.ts';

type ISBNMask = {
  mask: string;
  blocks?: MaskedPattern['blocks']; //excludes null and undefined from MaskedPattern
};
const isbn10Mask: ISBNMask = {
  mask: '0-0000-0000-`',
  blocks: {
    '`': {
      mask: /^[0-9Xx]$/,
    },
  },
};

const isbn13Mask: ISBNMask = {
  mask: '000-0-000-00000-0',
};

interface ISBNMaskProps extends InputBaseComponentProps {
  maskOptions: ISBNMask;
}

const ISBNMaskInput = forwardRef<HTMLInputElement, ISBNMaskProps>(function ISBNMask(
  { onChange, maskOptions, name, onBlur, ...other },
  ref,
) {
  return (
    <IMaskInput
      {...other}
      {...maskOptions}
      inputRef={ref}
      data-testid="isbn-input"
      onAccept={(value) => onChange({ target: { name, value } })}
      onBlur={() =>
        onBlur({
          target: {
            name,
          },
        })
      }
      overwrite={true}
    />
  );
});

interface AddBookProps {
  open: boolean;
}

const AddBook = ({ open }: AddBookProps) => {
  const navigate = useNavigate();
  const { submit } = useBookSubmit();
  const {
    handleSubmit,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    isValid,
    resetForm,
  } = useFormik<BookFormFields>({
    initialValues: {
      title: '',
      author: '',
      publishedDate: new Date(),
      isbnType: ISBN_TYPES.ISBN_13,
      isbn: '',
    },
    validationSchema: bookValidationSchema,
    onSubmit: (values) => {
      submit(values);
      resetForm();
    },
  });

  const isbnMask = values.isbnType === ISBN_TYPES.ISBN_10 ? isbn10Mask : isbn13Mask;
  const [openCancelConfirm, setCancelConfirm] = useState(false);

  const handleClose = () => {
    const { author, title, isbn } = values;
    if (!author && !title && !isbn) {
      handleConfirmClose();
      return;
    }
    setCancelConfirm(true);
  };

  const handleConfirmClose = () => {
    resetForm();
    setCancelConfirm(false);
    navigate(-1);
  };

  const handleCancelClose = () => {
    setCancelConfirm(false);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        role="dialog"
        aria-labelledby="create-book-drawer"
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              height: `calc(100% - ${HEIGHT_NAVBAR})`,
              top: HEIGHT_NAVBAR,
            },
          },
        }}
      >
        <form onSubmit={handleSubmit} style={{ height: '100%' }}>
          <Stack
            direction="column"
            spacing={2}
            sx={{
              width: 500,
              padding: '15px 40px',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Stack direction="column" spacing={3}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">Create your book</Typography>
                <IconButton aria-label="back" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Stack>
              <TextField
                autoFocus={true}
                required={true}
                fullWidth={true}
                id="title"
                name="title"
                label="Title"
                aria-label="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                slotProps={{
                  htmlInput: {
                    'data-testid': 'title-input',
                  },
                }}
              />
              <TextField
                fullWidth={true}
                required={true}
                id="author"
                name="author"
                label="Author"
                aria-label="author"
                value={values.author}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.author && Boolean(errors.author)}
                helperText={touched.author && errors.author}
                slotProps={{
                  htmlInput: {
                    'data-testid': 'author-input',
                  },
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Published Date"
                  aria-label="published-date"
                  value={values.publishedDate}
                  onChange={(date) => {
                    setFieldValue('publishedDate', date);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      onBlur: handleBlur,
                      required: true,
                      error: touched.publishedDate && Boolean(errors.publishedDate),
                      helperText:
                        touched.publishedDate && typeof errors.publishedDate === 'string'
                          ? errors.publishedDate
                          : '',
                    },
                  }}
                />
              </LocalizationProvider>
              <FormControl required={true} component="fieldset">
                <FormLabel id="isbn-type-label" component="legend" aria-label="isbn-type">
                  ISBN Type
                </FormLabel>
                <RadioGroup
                  row={true}
                  name="isbnType"
                  aria-labelledby="isbn-type-label"
                  value={values.isbnType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    aria-label="isbn-10"
                    value={ISBN_TYPES.ISBN_10}
                    control={<Radio />}
                    label="ISBN-10"
                  />
                  <FormControlLabel
                    aria-label="isbn-13"
                    value={ISBN_TYPES.ISBN_13}
                    control={<Radio />}
                    label="ISBN-13"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                name="isbn"
                label="ISBN"
                aria-label="isbn-input"
                required={true}
                value={values.isbn}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.isbn && Boolean(errors.isbn)}
                helperText={touched.isbn && errors.isbn}
                InputProps={{
                  inputComponent: ISBNMaskInput,
                  inputProps: {
                    maskOptions: isbnMask,
                  },
                }}
              />
            </Stack>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={handleClose} aria-label="close-btn">
                Close
              </Button>
              <Button onClick={() => resetForm()} color="warning" aria-label="reset-btn">
                Reset
              </Button>
              <Button
                color="primary"
                aria-label="submit-btn"
                disabled={!isValid}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
      </Drawer>
      <ConfirmDialog
        aria-label="cancel-dialog"
        title={'No dont go!'}
        description={
          'You just got started creating your very own book, are you sure you want to leave now?'
        }
        open={openCancelConfirm}
        onClose={handleCancelClose}
        onConfirm={handleConfirmClose}
      />
    </>
  );
};
export default AddBook;
