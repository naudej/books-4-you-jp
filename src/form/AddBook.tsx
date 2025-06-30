import React, { forwardRef } from 'react';
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
import * as yup from 'yup';
import { InferType } from 'yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { IMaskInput } from 'react-imask';
import { ISBN_TYPES } from '../data/types.ts';
import isISBN from 'validator/es/lib/isISBN';

import type { MaskedPattern } from 'imask';

type ISBNMask = {
  mask: string;
  blocks?: NonNullable<MaskedPattern['blocks']>; //excludes null and undefined from MaskedPattern
};
export const isbn10Mask: ISBNMask = {
  mask: '0-0000-0000-`',
  blocks: {
    '`': {
      mask: /^[0-9Xx]$/,
    },
  },
};

export const isbn13Mask: ISBNMask = {
  mask: '000-0-000-00000-0',
};

const validationSchema = yup.object({
  title: yup.string().required('Every book needs a title'),
  author: yup
    .string()
    .min(2, 'A name should at least have more than 2 letters')
    .required('Was the book written by a ghost?'),
  publishedDate: yup.date().required('Published date is required').typeError('Invalid date'),
  isbnType: yup.string().oneOf(Object.values(ISBN_TYPES)).required('Please select ISBN type'),
  isbn: yup
    .string()
    .required('Librarians would be mad without this, please dont make one cry')
    .test('is-valid-isbn', 'Invalid ISBN for selected type', function (value) {
      const { isbnType } = this.parent;
      if (!value || !isbnType) {
        return false;
      }
      const version = isbnType === ISBN_TYPES.ISBN_10 ? '10' : '13';
      return isISBN(value, version);
    }),
});

type FormFields = InferType<typeof validationSchema>;

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
//@TODO improvement move Textfields to another component that avoids all the bloat added to the Textfield e.g. <Input name="author" value={values.title} /> somehow uses the values.title to call the correct helpers, maybe can use FormikContext or useFormik here
const AddBook: React.FC<AddBookProps> = ({ open }) => {
  const navigate = useNavigate();
  const { handleSubmit, values, touched, errors, handleChange, handleBlur, setFieldValue } =
    useFormik<FormFields>({
      initialValues: {
        title: '',
        author: '',
        publishedDate: new Date(),
        isbnType: ISBN_TYPES.ISBN_13,
        isbn: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log({ values });
      },
    });

  const isbnMask = values.isbnType === ISBN_TYPES.ISBN_10 ? isbn10Mask : isbn13Mask;

  const handleClose = (
    _event: React.KeyboardEvent | React.MouseEvent,
    reason: 'backdropClick' | 'escapeKeyDown',
  ) => {
    navigate(-1);
    if (reason === 'backdropClick') {
      return;
    }
    navigate(-1);
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            width: 500,
            p: 5,
            marginTop: '80px',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">Create your book</Typography>
            <IconButton aria-label="back" onClick={() => navigate(-1)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack direction="column" spacing={3}>
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
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Published Date"
                value={values.publishedDate}
                onChange={(date) => {
                  setFieldValue('publishedDate', date);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    onBlur: handleBlur,
                    error: touched.publishedDate && Boolean(errors.publishedDate),
                    helperText:
                      touched.publishedDate && typeof errors.publishedDate === 'string'
                        ? errors.publishedDate
                        : '',
                  },
                }}
              />
            </LocalizationProvider>
            <FormControl component="fieldset">
              <FormLabel component="legend">ISBN Type</FormLabel>
              <RadioGroup
                row={true}
                name="isbnType"
                value={values.isbnType}
                onChange={handleChange}
              >
                <FormControlLabel value={ISBN_TYPES.ISBN_10} control={<Radio />} label="ISBN-10" />
                <FormControlLabel value={ISBN_TYPES.ISBN_13} control={<Radio />} label="ISBN-13" />
              </RadioGroup>
            </FormControl>
            <TextField
              name="isbn"
              label="ISBN"
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
            <Button onClick={() => navigate(-1)}>Close</Button>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Drawer>
  );
};
export default AddBook;
