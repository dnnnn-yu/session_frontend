
import React, { FormEvent, useState } from 'react';
import railsApi from '../../config/route';
import {Link} from 'react-router-dom'
import LockIcon from '@material-ui/icons/Lock';
import { Avatar, Button, CssBaseline, TextField, Typography, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
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
  const buttonName = props.endPoint === '/sign_in' ? "ログイン" : "新規登録"
  const nextDescription = props.endPoint === '/sign_in' ? "アカウントをお持ちでない方は新規登録" : "アカウントをお持ちの方はログイン"
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
          <LockIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          {buttonName}
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
            {buttonName}
          </Button>
        </form>
        <Link style={{color: 'gray', fontSize: '12px', marginTop: "5px"}}to={props.endPoint === "/sign_in" ? "/sign_up" : "/sign_in"}>
         {nextDescription}へ
        </Link>
      </div>
    </Container>
  );
}

export default AuthForm;
