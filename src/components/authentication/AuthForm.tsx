
import React, { FormEvent, useState } from 'react';
import railsApi from '../../config/route';
import { Avatar, Button, CssBaseline, TextField, Typography, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type Props = {
  endPoint: string
}

const AuthForm: React.FC<Props> = (props) => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const classes = useStyles();
  const handleAuth = (event: FormEvent) => {
    event.preventDefault();
    railsApi.authRequest({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: props.endPoint,
      data: { email: emailValue, password: passwordValue }
    })
      .then((res) => {
        localStorage.setItem('id', res.data.data.id)
        localStorage.setItem('uid', res.data.data.uid)
        localStorage.setItem('access-token', res.headers['access-token'])
        localStorage.setItem('client', res.headers['client'])
        window.location.href= "/"
      })
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <form className={classes.form} noValidate onSubmit={(event) => { handleAuth(event) }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            ログイン
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default AuthForm;
