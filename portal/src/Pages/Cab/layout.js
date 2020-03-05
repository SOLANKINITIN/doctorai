import React, { useState } from "react";
import useStyles from "./style";
import Header from "Components/Header";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import CreateIcon from "@material-ui/icons/Create";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import StarIcon from "@material-ui/icons/Star";
import BookIcon from "@material-ui/icons/Book";
import Cab from '@material-ui/icons/LocalTaxi';
import { InputComponent } from "Components";
import { handleError } from "Store/helper";
import { addCab } from "Store/action";
import { useHistory } from "react-router-dom";
import ExpressFirebase from 'express-firebase';

const Layout = () => {
  const classes = useStyles();
  const history = useHistory();
  const [driverName,setDriverName] = useState();
  const [description,setDescription] = useState();
  const [cabName,setCabName] = useState();
  const [cabNumber,setCabNumber] = useState();
  const [isSubmitting,setSubmitting] = useState(false);
  const [isValidForm,setValidForm] = useState(false);
  const [file,setFile] = useState(null);

  const handleAddCab = async()=>{
    try{
      setSubmitting(true);
      // Validation Part
      if(!driverName||!description||!cabName||!cabNumber){
        return setSubmitting(false);
      }

      const imageUrl = await ExpressFirebase.uploadFile(file.name,file.image);
      if(!imageUrl){
        return setSubmitting(false);
      }
      await addCab({driverName,description,cabName,cabNumber,thumbnailImage:imageUrl});
      history.push('/');
    } catch(err){
      handleError(err);
    }finally{
      // Reset State
      setSubmitting(false);
    }
  }

  const handleFileUpload =(e)=>{
    const files = e.target.files;
    if(files && files.length){
      setFile({image:files[0],name:files[0].name});
    }
  }

  return (
    <div className={classes.cabbooking}>
      <Header title="Add Cab" />
      <div className={classes.cabcontent}>
        <Container className={classes.container} maxWidth="md">
          <Grid>
            <Grid container spacing={3}>
              <Grid item lg={5} xs={12} sm={6}>
                <div className={classes.cabdivcontent}>
                  <div className={classes.logosection}>
                    <div className={classes.taxiicon}>
                      <img
                        src="./images/TexiLocation.JPG"
                        alt="taxi-icon"
                        className={classes.icontaxi}
                      />
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item lg={7} xs={12} sm={6}>
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.title}>
                  Add New Cab
                </Typography>
                <form>
                  <InputComponent 
                    placeholder="Driver name"
                    Icon={AccountCircle}
                    value={driverName}
                    onChange={e => setDriverName(e.target.value)}
                  />

                  <InputComponent 
                    placeholder="Description"
                    Icon={CreateIcon}
                    multiline
                    rowsMax="4"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  <InputComponent 
                    placeholder="Cab name"
                    Icon={Cab}
                    value={cabName}
                    onChange={e => setCabName(e.target.value)}
                  />
                  <InputComponent 
                    placeholder="Cab Number"
                    Icon={Cab}
                    value={cabNumber}
                    onChange={e => setCabNumber(e.target.value)}
                  />
                  <input
                      accept="image/*"
                      hidden
                      id="raised-button-file"
                      multiple
                      type="file"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="raised-button-file">
                      <div style={{ display: 'flex', alignItems: 'center', flex: 1, paddingBottom: 8,marginTop:8, borderBottom: '1px solid rgba(0,0,0,0.5)' }}>
                        <AddAPhotoIcon color="primary" />
                        <Typography variant="body2" color="textSecondary" style={{ padding: '0 10px' }}>
                          {(file||{}).name ||'Upload cab image'}
                        </Typography>
                      </div>
                    </label>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddCab}
                    style={{marginTop:20}}
                    disabled={isSubmitting}
                    fullWidth>
                    {isSubmitting?'Adding Cab....':'Submit'}
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
export default Layout;
