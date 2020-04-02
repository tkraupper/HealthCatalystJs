import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/people";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, TextField, ButtonGroup, Button } from "@material-ui/core";
import PeopleForm from "./PeopleForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

////////////////////LIST OF RECORDS/////////////

//STYLES
const styles = theme =>({
  root: {
    "& .MuiTableCell-head":{
      fontSize: "1.25rem"
    }
  },

  paper :{
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  }
})

//MAIN FUNCTION TO RETURN WEB PAGE
const People = ({classes,...props}) => {
  const [currentId,setCurrentId] = useState(0)

  useEffect(()=>{
    props.fetchAllPeople();
  },[])

  //toast message
  const { addToast } = useToasts()

  const onDelete = id =>{
    if(window.confirm('Are you sure you want to delete this record?'))
      props.deletePerson(id, ()=>addToast("Deleted successfully", { appearance: 'info' }))
  }

  const displayList = props.filteredList ? props.filteredList : props.personList;

  return(
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
	<Grid item xs={3}>
	  <PeopleForm {...({ currentId, setCurrentId })}/>
	</Grid>
	<Grid item xs={9}>
        <div style={{paddingLeft: '20px', paddingBottom: '20px'}}>
            <TextField label="Search Field" onChange={e => { props.searchPeople(props.personList, e.target.value) }}></TextField>
        </div>
	  <TableContainer>
	    <Table>
	      <TableHead className={classes.root}>
		<TableRow>
		  <TableCell>First Name</TableCell>
		  <TableCell>Last Name</TableCell>
		  <TableCell>Age</TableCell>
		  <TableCell>Address</TableCell>
		  <TableCell>Interests</TableCell>
		  <TableCell>Photo</TableCell>
		</TableRow>
	      </TableHead>
	      <TableBody>
		  {
		    displayList.map((record, index)=>{
		      return (<TableRow key={index} hover>
			<TableCell>{record.firstName}</TableCell>
			<TableCell>{record.lastName}</TableCell>
			<TableCell>{record.age}</TableCell>
			<TableCell>{record.address}</TableCell>
			<TableCell>{record.interests}</TableCell>
			<TableCell><img src={record.picture} style={{height: '75px', width: '75px'}} alt='Profile Picture'/></TableCell>
			<TableCell>
			  <ButtonGroup variant="text">
			    <Button>
			      <EditIcon color="primary" 
				onClick={() => { setCurrentId(record.id) }}/>
			    </Button>
			    <Button>
			      <DeleteIcon color="secondary"
				onClick={() => { onDelete(record.id) }} />
			    </Button>
			  </ButtonGroup>
			</TableCell>
			</TableRow>)
		    })
		  }
		      </TableBody>
		    </Table>
		  </TableContainer>
		</Grid>
	      </Grid>
	    </Paper>
  );
}

const mapStateToProps = state => ({
  personList: state.person.list,
  filteredList: state.person.filteredList
})

const mapActionToProps = {
  fetchAllPeople: actions.fetchAll,
  deletePerson: actions.Delete,
  searchPeople: actions.searchPeople
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(People));
