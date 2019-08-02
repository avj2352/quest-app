import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// material
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
// styles
import  { styles } from './drop-down-styles.js';

const OutlinedDropDown  = props => {
    const { classes } = props;

    const [labelWidth, setLabelWidth] = React.useState(0);
    const [values, setValues] = useState({age: ''});
    // ref
    const inputLabel = useRef(null);
    // event handlers
    function handleDropdown(event) {
        setValues({[event.target.name]: event.target.value});
    }

    // componentDidMount
    useEffect(()=>{        
        setLabelWidth(inputLabel.current.offsetWidth);
    },[]);

    return(
        <React.Fragment>
            <FormControl variant="outlined" className={classes.dropDown}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          {props.label}
        </InputLabel>
        <Select
          value={values.age}
          onChange={handleDropdown}
          input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
          displayEmpty
          name="age"
          className={classes.selectEmpty}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
        </React.Fragment>
    );
};

OutlinedDropDown.propTypes = {
  label: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(OutlinedDropDown);