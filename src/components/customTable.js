import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function CustomTable({ head, body }) {

    // <CustomTable

    //     head={!isLoading ? ["id", "name", "edit", "show"] : []}
    //     body={
    //         !isLoading ? categories.map((category) => {
    //             let ob = { id: category.id, name: category.name, show: <Link to={"/categories/" + category.id} />, edit: <Link to={"/categories/" + category.id + "/edit"} /> }
    //             return Object.values(ob)
    //         }) : []
    //     }
    // />
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            head.map((column, index) =>
                                <TableCell align={index === 0 ? "left" : "left"} key={column}>{column}</TableCell>
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {body.map((row) => (

                        <TableRow
                            key={row[0]}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {row.map((column, index) => (
                                <>
                                    {console.log(index, column)}
                                    < TableCell align="left" key={index} >{column}</TableCell>
                                </>
                            ))}

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
