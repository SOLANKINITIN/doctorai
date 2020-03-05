import React, { useEffect, useState } from 'react';
import { Button, Avatar, Fab, Tooltip } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import { Header, Listing } from 'Components';
import useStyles from './style';
import { fetchHospitalListing } from 'Store/action';
import { selectHospital } from 'Store/selectors';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Input from '@material-ui/core/Input';

import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
const Layout = props => {
  const classes = useStyles();
  const hospitalListing = useSelector(selectHospital);
  const history = useHistory();
  const [state, setState] = useState({
    input: '',
    Message: [
      'Hi',
      'My name is Kishan',
      'nice to meet you',
      'hope you doing well',
      'Glad to meet You',
      'Be Happy in Life'
    ]
  });
  useEffect(() => {
    fetchHospitalListing();
  }, []);

  // console.log(state.Message());

  const navigateHospitalDetail = element => {
    history.push(`/hospital/${element._id}`);
  };
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChange = e => {
    e.persist();
    setState(prevState => {
      return {
        ...prevState,
        input: e.target.value
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleclick = () => {
    let msg = state.Message.slice();
    msg.push(state.input);
    setState({
      Message: msg,
      input: ''
    });
  };

  console.log('MESAGE STATE', state.Message);

  return (
    <div>
      <Header title='Hospital' />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle
          id='form-dialog-title'
          style={{ borderBottom: '1px solid #ddd', color: '#999999' }}
        >
          Chat With DoctorAi
        </DialogTitle>
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className={classes.chatBoard}>
          <section className={classes.msgChat}>
            <div className={classes.msg}>
              <div className={classes.msgImg}></div>
              <div
                className={classes.msgbubble}
                style={{ borderBottomLeftRadius: 0 }}
              >
                <div className={classes.msgInfo}>
                  <div className={classes.msgSenderName}>Doctor</div>
                  <div className={classes.msgTime}>12:45</div>
                </div>
                <div className={classes.msgText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consectetur veniam a laudantium expedita quis reiciendis sit
                  optio amet ex quas, fugit autem perferendis voluptatum alias
                  eveniet fugiat vero sunt nobis consequatur! Fugiat repudiandae
                  at rerum voluptatibus vero. Facilis dolor consequuntur, quo
                  corrupti nemo ea fuga iure officia eaque quas adipisci.
                </div>
              </div>
            </div>
            {/* start */}
            {state.Message.map((item, key) => (
              <div key={key}>
                <div
                  className={classes.msg}
                  style={{ flexDirection: 'row-reverse' }}
                >
                  <div
                    className={classes.msgImgRight}
                    style={{ margin: '0 0 0 10px' }}
                  ></div>
                  <div
                    className={classes.msgbubble}
                    style={{
                      color: '#fff',
                      background: '#7563FF',
                      borderBottomLeftRadius: 0
                    }}
                  >
                    <div className={classes.msgInfo}>
                      <div className={classes.msgSenderName}>kishan</div>
                      <div className={classes.msgTime}>12.00</div>
                    </div>
                    <div className={classes.msgText}>
                      {/* this is patient side */}
                      {item}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* end */}
          </section>
        </DialogContent>{' '}
        <DialogActions>
          <Avatar style={{ background: '#ffffff' }}>
            <InsertEmoticonIcon style={{ color: '#333' }} />
          </Avatar>
          <Input
            id='standard-adornment-password'
            fullWidth
            placeholder='Type a massage'
            // value={state.input}
            onChange={handleChange}
          />
          <Avatar
            onClick={() => alert('say somthing')}
            style={{ background: '#0EC74B' }}
          >
            <MicIcon style={{ color: '#ffffff' }} />
          </Avatar>
          <Avatar style={{ background: '#0EC74B' }} onClick={handleclick}>
            <SendIcon style={{ color: '#ffffff' }} />
          </Avatar>
        </DialogActions>
      </Dialog>
      <Tooltip onClick={handleClickOpen} title='Add' aria-label='add'>
        <Fab color='primary' className={classes.absolute}>
          <ChatIcon />
        </Fab>
      </Tooltip>
      <div className={classes.addbutton}>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={() => history.push('/add/hospital')}
        >
          ADD HOSPITAL
        </Button>
      </div>
      <Listing
        data={hospitalListing}
        keys={{
          hospitalName: 'Hospital Name',
          mobileNo: 'Mobile Number',
          address: 'Address'
        }}
        onClick={navigateHospitalDetail}
      />
    </div>
  );
};

export default Layout;
