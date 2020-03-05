import React, { useEffect, useState } from 'react';
import {Typography, Container, Card, CardContent, Avatar, Button, CardActionArea, CardActions, Grid,Cir, CircularProgress} from '@material-ui/core';
import Category from '@material-ui/icons/Category';
import Description from '@material-ui/icons/Description';

import {Header, InputComponent} from 'Components';
import useStyle from './style';
import { handleError } from 'Store/helper';
import { addCategory } from 'Store/action';
import { useSelector } from 'react-redux';
import {selectCurrentCategory} from 'Store/selectors';
import { useHistory } from 'react-router-dom';

const CategoryAddPage = (props) => {
  const classes = useStyle();
  const [categoryName,setCategoryName] = useState();
  const [description,setDescription] = useState();
  const [formValid,setFormValid] = useState(true);
  const currentCategory = useSelector(selectCurrentCategory);
  const history = useHistory();

  const handleAddCategory = async ()=>{
    try{
      if(!description || !categoryName){
        return setFormValid(false);
      }
      // Api Calling will be here
      await addCategory({title:categoryName,description});
    } catch(err){
      handleError(err);
    } finally{
      setCategoryName();
      setDescription();
      history.push('/category/list');
    }
  }

  return (
    <div>
      <Header title="Add Category"/>
      <Container className={classes.container} maxWidth="md">
          <Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <div className={classes.Docicon}>
                  <img
                    src="/images/Doctor.svg"
                    alt="taxi-icon"
                    className={classes.icondoctor}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h5"
                  align="center">
                  Category Details
                </Typography>
                <form>
                  <InputComponent 
                    placeholder="Category name"
                    Icon={Category}
                    value={categoryName}
                    onChange={(e)=>setCategoryName(e.target.value)}
                  />
                  <InputComponent 
                    placeholder="Category description"
                    Icon={Description}
                    Icon={Category}
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                  />
                  <Typography variant="body2" color="textSecondary" style={{marginTop:30}}>
                    Note : This is mainly service or category offered by hospital
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{marginTop:15}}
                    onClick={handleAddCategory}
                    fullWidth
                    disabled={currentCategory.loading}
                    >
                    {currentCategory.loading && <CircularProgress color="inherit" size={20} style={{marginRight:10}}/>} Submit
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Container>
    </div>
  )
}

export default CategoryAddPage;