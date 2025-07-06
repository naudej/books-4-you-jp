import { Box } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import { THUMBNAIL_SIZES } from '../utils/constants.ts';
import { useState } from 'react';

interface BookPreviewImageProps {
  id?: string;
  title: string;
  src?: string;
  variant?: keyof typeof THUMBNAIL_SIZES;
}

const BookPreviewImage = ({ id, title, src, variant = 'sm' }: BookPreviewImageProps) => {
  const [showThumbnail, setShowThumbnail] = useState(false);
  const size = THUMBNAIL_SIZES[variant];
  const handleError = () => {
    setShowThumbnail(true);
  };

  if (showThumbnail || !src) {
    return (
      <Box
        role="img"
        aria-label={title}
        style={{
          borderRadius: '3px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BookIcon aria-hidden={true} style={{ ...size }} />
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
