import React, { useEffect } from "react";
import { Accordion, Badge, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
// import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import { listCountries } from "../../actions/countryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell, Box
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';


function MyCountries({ history, search }) {
  const dispatch = useDispatch();

  const countryList = useSelector((state) => state.countryList);
  const { loading, error, countryName } = countryList;

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const noteDelete = useSelector((state) => state.noteDelete);
  // const {
  //   loading: loadingDelete,
  //   error: errorDelete,
  //   success: successDelete,
  // } = noteDelete;

  // const noteCreate = useSelector((state) => state.noteCreate);
  // const { success: successCreate } = noteCreate;

  // const noteUpdate = useSelector((state) => state.noteUpdate);
  // const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listCountries());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    // successDelete,
    // successCreate,
    // successUpdate,
  ]);

  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure?")) {
  //     dispatch(deleteNoteAction(id));
  //   }
  // };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {/* {console.log(notes)} */}
      <Link to="/country">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      
      {loading && <Loading />}
              <br />

      {<TableContainer>
        <TextField
          id="standard-basic"
          type="search"
          autoComplete="off"
          name="search"
          value={this.state.search}
          onChange={this.onChange}
          placeholder="Search country"
          required
        />
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Flag</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Captical</TableCell>
              <TableCell align="center">Region</TableCell>
              {/* <TableCell align="center">Currency</TableCell> */}
              <TableCell align="center">Coordinate</TableCell>
              <TableCell align="center">Area</TableCell>
              <TableCell align="center">Population</TableCell>
              <TableCell align="center">Map Link</TableCell>
              <TableCell align="center">Translations</TableCell>
              {/* <TableCell align="center">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.products.map((row) => (
            
              <TableRow key={row.name.common}>
                <TableCell align="center" component="th" scope="row">
                  <img src={row.flags.svg} width="50" height="30" />
                </TableCell>
                <TableCell align="center">{row.name.common}</TableCell>
                <TableCell align="center">{row.capital}</TableCell>
                <TableCell align="center">{row.region}</TableCell>
                {/* <TableCell align="center">{Object.keys(currencies).map(k=>k)}</TableCell> */}
                <TableCell align="center">{row.latlng[0].toFixed(2)+", "+row.latlng[1].toFixed(2)}</TableCell>
                <TableCell align="center">{row.area.toFixed(2)}</TableCell>
                <TableCell align="center">{row.population}</TableCell>
                <TableCell align="center"><a href={row.maps.googleMaps} target="_blank">{row.maps.googleMaps}</a></TableCell>
                <TableCell align="center">
                  <Button
                    className="button_style"
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={(e) => this.handleProductEditOpen(Object.values(row.translations))}
                  >
                    Details
                </Button>
                {/* <Button
                    className="button_style"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={(e) => this.deleteProduct(row._id)}
                  >
                    Delete
                </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        <Pagination 
        component="div"
        count={this.state.pages} 
        page={this.state.page} 
        onChange={this.pageChange} 
        rowsPerPage={this.state.rowsPerPage}
        onRowsPerPageChange={this.handleChangeRowsPerPage} 
        color="primary" />
      </TableContainer>}
    </MainScreen>
  );
}

export default MyCountries;