import React, { useState } from 'react';
import {
  Avatar, Button, CssBaseline, TextField, Typography, makeStyles,
  Container, Chip, Select, Input, MenuItem, Theme, useTheme 
} from '@material-ui/core';

// Radio
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

// DatePicker
import ja from "date-fns/locale/ja";
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(0),
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
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};

const names = [
  'ボーカル',
  'ギター',
  'ベース',
  'ドラム',
  'キーボード',
];

function getStyles(name: string, partName: string[], theme: Theme) {
  return {
    fontWeight:
      partName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Profile: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  // datepicker
  const [selectedDate, handleDateChange] = useState<Date | null>(new Date());

  // select
  const [partName, setpartName] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setpartName(event.target.value as string[]);
  };

  return(
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          プロフィール
        </Typography>
        <form className={classes.form} noValidate>
          <FormLabel className={classes.form} style={{marginTop: '0px'}} component="legend">名前(必須)</FormLabel>
          <TextField
            variant="standard"
            required
            fullWidth
            id="name"
            name="name"
            autoComplete="name"
            autoFocus
          />

          <FormLabel className={classes.form} component="legend">性別</FormLabel>
          <RadioGroup aria-label="gender" name="gender" style={{flexDirection: 'row'}}>
            <FormControlLabel value="male" control={<Radio color="primary" />} label="男性" />
            <FormControlLabel value="female" control={<Radio color="primary"/>} label="女性" />
            <FormControlLabel value="other" control={<Radio color="primary"/>} label="その他" />
          </RadioGroup>

          <FormLabel className={classes.form} component="legend">生年月日</FormLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
            <KeyboardDatePicker
              fullWidth
              disableToolbar
              openTo="year"
              views={["year", "month", "date"]}
              value={selectedDate}
              onChange={handleDateChange}
              format="yyyy/MM/dd"
              maxDate={Date()}
              okLabel="決定"
              cancelLabel="キャンセル"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

          <FormLabel className={classes.form} style={{marginTop: '30px'}} component="legend">担当パート(※複数選択可)</FormLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            fullWidth
            value={partName}
            onChange={handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, partName, theme)}>
                {name}
              </MenuItem>
            ))}
          </Select>

          <FormLabel className={classes.form} style={{marginTop: '30px'}} component="legend">プロフィール文</FormLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            rows={4}
            variant="standard"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            登録
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Profile;