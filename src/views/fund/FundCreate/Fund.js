import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Divider,
  Typography, 
  Grid,
  Avatar,
  colors,
  makeStyles
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import api from '../../../axios';
import Api from '../../../Api';
import { useAlert } from 'react-alert';


const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));


const Notifications = ({ className, ...rest }) => {
  const classes = useStyles();
  const alert = useAlert();

  
  const handleFormSubmit = e => {
    e.preventDefault();
    const ArrayFund = {
      merchant_id: Api.request.merchant_id,
      userId: Api.request.userID,
      username: Api.request.username,
      fund: values.fund
    };
   // console.log(ArrayFund)
   // setLoading(true);
    api
      .post(`${Api.request.URL}/accounting/request/fund/`, ArrayFund)
      .then(res => {
        alert.success(res.data.message)
      })
      .catch(error => {
        alert.error(error.response.data.message)
    });

  }


const [values, setValues] = useState({
    fund: ''
  });
  const [merchant, setMerchant] = useState([]);


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });


  };

  const[merchantID, setmerchantID] = useState('')

  const handeGetEntry = (e, name) => {
     let Serch;
    if(name===undefined){
      Serch = '';
    }else{
      Serch = name;
    }
    //console.log("handeGetEntry: ", Serch)
    api.get(`${Api.request.URL}/admin/merchant?page=1&s=${Serch}`).then(res => {
      
      setMerchant(res.data.DATA.data);
      res.data.DATA.data.map((row)=>{
        setmerchantID(row.id)
        //console.log("eto: ", row.id)
      })
    });
  }
  useEffect(() => {
    handeGetEntry();
  }, []);

 
const [merchantFund, setMerchantFund] = useState('');
const [merchantNAME, setMerchantNAME] = useState('');

useEffect(() => {
  api.get(`${Api.request.URL}/admin/merchant/${Api.request.merchant_id}`).then(res => {
    res.data.DATA.map((row) => {
    setMerchantFund(row._fund);
    setMerchantNAME(row.merchantName);
  })

});

}, []);

  return (
    <div>
     <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
      <Card>
      <form 
       onSubmit={handleFormSubmit}
      className={clsx(classes.root, className)} 
      {...rest}>
        <CardHeader
          title="Create Request Fund"
          style={{ backgroundColor: 'rgb(45 165 98)', color: 'white' }}
        />
        <Divider />
        <CardContent>
     
      {/*   <Autocomplete
        freeSolo
        options={merchant.map((row) => row.merchantName)}
        renderInput={(params) =>  (
          <TextField {...params} onChange={handleChange} label="Select Merchant"
          onSelect={(e) =>
            handeGetEntry(e, params.inputProps.value)
          }
           margin="normal" variant="outlined" />
        )}
      /> */}

          <TextField
            fullWidth
            margin="normal"
            id="outlined-basic"
            label="Input Request Amount "
            variant="outlined"
            type='number'
            name="fund"
            onChange={handleChange}
            value={values.fund}
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button style={Api.Button_save} type="submit" variant="contained">
            Save Fund
          </Button>
        </Box>
        </form>
      </Card>
      </Grid>
 

       <Grid item md={6} xs={12}>
       <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              {merchantNAME}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              Php {merchantFund.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
      </Grid>
      </Grid>
    </div>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
