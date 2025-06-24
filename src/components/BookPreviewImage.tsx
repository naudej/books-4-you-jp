import { Box } from "@mui/material";
import {useState} from "react";
import BookIcon from '@mui/icons-material/Book';

const THUMBNAIL_SIZE = '48px';

interface BookPreviewImageProps {
    id: string;
    title: string;
    src?: string
}

const BookPreviewImage: React.FC<BookPreviewImageProps> = ({ id, title, src }) => {
    const [showThumbnail, setShowThumbnail] = useState(false);

    if (showThumbnail) {
        return (
            <Box
                style={{
                    width: THUMBNAIL_SIZE,
                    height: THUMBNAIL_SIZE,
                    // backgroundColor: themeVars.color.background.fill.subtle.default,
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <BookIcon />
            </Box>
        );
    }

    return (
        <img
            key={id}
            src={src}
            onError={() => setShowThumbnail(true)}
            style={{ borderRadius: "4px" }}
            alt={title}
            width={THUMBNAIL_SIZE}
            height={THUMBNAIL_SIZE}
        />
    );
};

export default BookPreviewImage;
