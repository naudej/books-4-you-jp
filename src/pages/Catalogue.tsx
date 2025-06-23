import * as React from 'react';
import Typography from '@mui/material/Typography';
import BooksTable from "../components/BooksTable.tsx";
import {useBookData} from "../data/useBookData.tsx";

export default function Catalogue() {
 const {books} = useBookData();

 console.log({books});
    return (
        <BooksTable />
    );
}
