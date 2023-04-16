import React, { useEffect, useState } from "react";
import { Accordion, Badge, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell, Box
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import { listCountries } from "../../actions/countryActions";

function MyNotes({ history, search }) {
  const dispatch = useDispatch();

  // const noteList = useSelector((state) => state.noteList);
  const countryList = useSelector((state) => state.countryList);
  // const { loading, error, notes , countries} = noteList;
  const { loading, error , countries} = countryList;

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const [openProductEditModal, setOpenProductEditModal, closeProductEditModal, setCloseProductEditModal] = useState(false);
  const [name, setName] = useState("");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    dispatch(listCountries(search));
    // dispatch(listCountries(name));
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
    name
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  const handleProductEditOpen = (data) => {
    setOpenProductEditModal(true);
    setName(data.name);
    setTranslations(data);
  };

  const handleProductClose = () => {
    // this.setState({ openProductModal: false });
    setCloseProductEditModal(true);
  };

  const handleProductEditClose = () => {
    // this.setState({ openProductEditModal: false });
    setOpenProductEditModal(false);
  };


  return (
    <MainScreen>
      {console.log("get: ", countries)}
      {/* <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link> */}
      {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
      {/* {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )} */}
      {loading && <Loading />}
      {/* {loadingDelete && <Loading />} */}

        <Dialog
          open={openProductEditModal}
          onClose={handleProductClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">Translation details</DialogTitle>
          <DialogContent>
            <TableContainer>
            <Table>
              <TableBody>
              {Object.keys(translations).map((language) => {
                const translation = translations[language];
                console.log(translation);
                return (
                  <TableRow key={language}>
                    <TableCell>{language}</TableCell>
                    <TableCell>{translation.official}</TableCell>
                    <TableCell>{translation.common}</TableCell>
                  </TableRow>
                );
              })}

              </TableBody>
            </Table>
      </TableContainer>
            
          </DialogContent>

          <DialogActions>
            <Button onClick={handleProductEditClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

    {<TableContainer>
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
            {countries && countries.map((row) => (
            
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
                    onClick={(e) => handleProductEditOpen(Object.values(row.translations))}
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
        // count={this.state.pages} 
        // page={this.state.page} 
        // onChange={this.pageChange} 
        // rowsPerPage={this.state.rowsPerPage}
        // onRowsPerPageChange={this.handleChangeRowsPerPage} 
        color="primary" />
      </TableContainer>}
    </MainScreen>
  );
}

export default MyNotes;
