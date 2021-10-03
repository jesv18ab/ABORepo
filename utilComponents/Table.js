import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getCoordsInfo } from '../utils/helperFunctions'
import styles from '../assets/scss/Main.module.css'
import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles({
    container: {
        maxHeight: 440
    },
    root: {
        width: '100%'
    }
})

const columns = [
    { id: 'subject', label: 'Location' },
    {
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
        id: 'value',
        label: 'Company'
    },
    {
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
        id: 'plast',
        label: 'Plastic Collected'
    },
    {
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
        id: 'time',
        label: 'Timestamp'
    }
]

function createData(subject, value, plast, time) {
    return { subject, value, plast, time }
}

export default function CustomTable() {
    const [rows, setRows] = useState([])
    const [page] = useState(0)
    const [rowsPerPage] = useState(10)
    const classes = useStyles()

    useEffect(() => {
        async function retrieveCoords() {
            return await getCoordsInfo()
        }
        retrieveCoords().then((infoArr) => {
            infoArr.forEach((item) => {
                setRows((oldArray) => [
                    ...oldArray,
                    createData(
                        item.info.results[0].formatted_address,
                        item.company,
                        item.plasticCollected,
                        item.timestamp
                    )
                ])
            })
        })
    }, [])
    //)
    if (rows.length !== 0) {
        return (
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="center"
                                        style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow key={index} hover tabIndex={-1}>
                                            {columns.map((column) => {
                                                const value = row[column.id]
                                                return (
                                                    <TableCell
                                                        style={{
                                                            fontSize: '12px',
                                                            fontWeight: 'bold'
                                                        }}
                                                        key={column.id}
                                                        align="center">
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    } else
        return (
            <div className="flex justify-center">
                <CircularProgress />
            </div>
        )
}
