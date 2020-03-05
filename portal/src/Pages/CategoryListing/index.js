import React, { useEffect } from "react";
import { Button } from "@material-ui/core";

import { Header, Listing } from "Components";
import useStyles from "./style";
import { fetchHospitalListing, fetchCategory } from "Store/action";
import { selectHospital, selectCategories } from "Store/selectors";
import { useSelector } from "react-redux";
import { getFormattedString } from "Helper";
import { useHistory } from "react-router-dom";

const Layout = props => {
  const classes = useStyles();
  const categoryListing = useSelector(selectCategories);
  const history = useHistory();

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div>
      <Header title="Categories" />
      <Listing
        data={categoryListing}
        keys={{
          title: "Category Name",
          description: "Description",
        }}
      />
    </div>
  );
};

export default Layout;
