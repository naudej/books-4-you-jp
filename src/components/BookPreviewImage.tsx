import * as React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import BookIcon from '@mui/icons-material/Book';
import { THUMBNAIL_SIZES } from '../utils/constants.ts';

interface BookPreviewImageProps {
  id?: string;
  title: string;
  src?: string;
  variant?: keyof typeof THUMBNAIL_SIZES;
}

const BookPreviewImage: React.FC<BookPreviewImageProps> = ({ id, title, src, variant = 'sm' }) => {
  const [showThumbnail, setShowThumbnail] = useState(false);
  const size = THUMBNAIL_SIZES[variant];
  const handleError = () => {
    setShowThumbnail(true);
  };

  if (showThumbnail || !src) {
    return (
      <Box
        style={{
          borderRadius: '3px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BookIcon style={{ ...size }} />
      </Box>
    );
  }

  return (
    <img
      key={id ?? title}
      src={src}
      onError={handleError}
      style={{ borderRadius: '3px', ...size }}
      alt={title}
    />
  );
};

export default BookPreviewImage;
