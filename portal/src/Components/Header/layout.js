import React, { Component, useState } from "react";
import { Typography, AppBar, Toolbar, withStyles, List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton } from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from '@material-ui/icons/Menu';
import BackButton from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";

const Layout = (props)=> {
    const[drawerOpen,setDrawerOpen] = useState(false);
    const history = useHistory();
    const { classes, title ,drawer, backButton } = props;

    const toggleDrawer = ()=>{
      setDrawerOpen(!drawerOpen);
    }
    return (
      <AppBar position="static">
        <Toolbar>
          {Boolean(drawer) && (
             <Drawer open={drawerOpen}>
              <List>
                {["Home", "Hospital", "Send email", "Drafts"].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
            )}
            {Boolean(drawer) && (
              <IconButton onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}
            {Boolean(backButton) && (
              <BackButton />
            )}
          <Typography variant="h6">{title || "Doctor AI"}</Typography>
        </Toolbar>
      </AppBar>
    );
}

export default Layout;
