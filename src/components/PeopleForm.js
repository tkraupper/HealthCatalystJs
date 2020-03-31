import React, { useState, useEffect } from 'react';
import { Grid, TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/people";
import { useToasts } from "react-toast-notifications";

/////////////////////FORM OPERATIONS//////////////////

//styles
const styles = theme =>({
  root:{
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: 230,
    }
  },
  smMargin:{
    margin: theme.spacing(1),
  }
})

//setting initual fields to blank
const initialFieldValues ={
  firstName: '',
  lastName: '',
  age: '',
  address: '',
  interests: ''
}

//ouputting form and ability to call useForm to perform common functions
const PeopleForm = ({classes, ...props}) => {
  //toast method
  const { addToast } = useToasts()

  //validation method
  const validate = (fieldValues = values) =>{
    let temp={}
    if('firstName' in fieldValues)
      temp.firstName = fieldValues.firstName?"":"First name field is required"
    if('age' in fieldValues)
      temp.age = fieldValues.age?"":"Age field is required"
    if('interests' in fieldValues)
      temp.interests = fieldValues.interests?"":"At least one interest is required"
    setErrors({
      ...temp
    })

    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }

  const {
    values,
    setValues, 
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFieldValues, validate, props.setCurrentId)

  //submit button event
  const handleSubmit = e => {
    e.preventDefault()
    if(validate())
    {
      const onSuccess = () => {
	resetForm()
	addToast("Submitted successfully", {appearance:'success'})
      }
      if(props.currentId==0)
	props.createPerson(values, onSuccess)
      else
	props.updatePerson(props.currentId, values, onSuccess)
    }
  }

  useEffect(()=>{
    if(props.currentId != 0) {
      setValues({
	...props.personList.find(x => x.id==props.currentId)
      })
      setErrors({})
    }
  }, [props.currentId])

  return(
    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
      <Grid item xs={6}>
	<TextField 
	  name="firstName" 
	  variant="outlined" 
	  label="First Name" 
	  value={values.firstName} 
	  onChange={handleInputChange} 
	  error={true} 
	  helperText={errors.firstName}
	  //{...(errors.firstName && {error:true, helpterText:errors.firstName})}
	>
      </TextField>
	<TextField 
	  name="lastName" 
	  variant="outlined" 
	  label="Last Name" 
	  onChange={handleInputChange} 
	  value={values.lastName}></TextField>
	<TextField 
	  name="age" 
	  variant="outlined" 
	  label="Age" 
	  value={values.age}
	  onChange={handleInputChange} 
	  error={true} 
	  helperText={errors.age}
	  {...(errors.age && {error:true, helperText:errors.age})}></TextField>
      </Grid>
      <Grid item xs={6}>
	<TextField 
	  name="address" 
	  variant="outlined" 
	  label="Address" 
	  onChange={handleInputChange} 
	  value={values.address}></TextField>
	<TextField 
	  name="interests" 
	  variant="outlined" 
	  label="Interests" 
	  value={values.interests}
	  error={true} 
	  onChange={handleInputChange} 
	  helperText={errors.interests}
	  {...(errors.interests && {error:true, helpterText:errors.interests})}></TextField>
      </Grid>
      <div className={classes.smMargin}>
	<Button variant="contained" color="primary" type="submit">Submit</Button>
	<Button variant="contained" onClick={resetForm}>Reset</Button>
      </div>
    </form>
  );
}

const mapStateToProps = state => ({
  personList: state.person.list
})

const mapActionToProps = {
  createPerson: actions.create,
  updatePerson: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PeopleForm));
