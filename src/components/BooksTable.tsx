import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHeader from "./TableHeader.tsx";
import {Book, HeadCell, Order} from "../data/types.ts";
import BookPreviewImage from "./BookPreviewImage.tsx";
import {Avatar} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
    const aValue = a[orderBy] ?? ''
    const bValue = b[orderBy] ?? ''

    if (bValue < aValue) return -1
    if (bValue > aValue) return 1
    return 0
}

function getComparator<Key extends keyof Book>(
    order: Order,
    orderBy: Key
): (a: Book, b: Book) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

interface BooksTableProps {
    books: Book[];
    tableHeaders: HeadCell[];
}

const BooksTable: React.FC<BooksTableProps> = ({books, tableHeaders }) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Book>('title');
    const navigate = useNavigate();

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Book,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const onRowClick = (id: string) => {
        navigate(`/book/${id}`);
    };

    const sortedBooks = React.useMemo(
        () =>
            [...books]
                .sort(getComparator(order, orderBy)),
        [books, order, orderBy],
    );
    //@TODO Note Categories search is not working

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <TableHeader
                            headers={tableHeaders}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {sortedBooks.map(({id, title, isbn, authors, publishedDate, categories, thumbnail}) => {
                                return (
                                    <TableRow
                                        hover
                                        onClick={() => onRowClick(id)}
                                        key={id}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell
                                            id={id}
                                        >
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <BookPreviewImage id={id} title={title} src={thumbnail} />
                                                <Typography variant="body1" pl="10px">{title}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell >{id}</TableCell>
                                        <TableCell >{isbn}</TableCell>
                                        <TableCell >
                                            {
                                                authors.map((author) => (
                                                    <Box key={`${author}-${id}`} sx={{display: 'flex', alignItems: 'center', height: "100%", marginBottom: "10px"}} >
                                                        <Avatar sx={{ bgcolor: deepOrange[200], width: 24, height: 24, marginRight: "10px" }}>{author.charAt(0)}</Avatar>
                                                        <Typography variant="body1">{author}</Typography>
                                                    </Box>
                                                ))
                                            }
                                        </TableCell>
                                        <TableCell >{publishedDate}</TableCell>
                                        <TableCell >
                                            {
                                                categories.map((category) => (<Typography variant="body1" key={`${category}-${id}`} gutterBottom={categories.length > 1}>{category}</Typography>))
                                            }
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
export default BooksTable;
