import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Grid,
  FormControlLabel,
  Switch,
  Box,
  Button,
  MenuItem,
  TextField,
  LinearProgress,
} from '@material-ui/core';

import {} from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Formik, Form, Field, FieldAttributes, useField } from 'formik';

interface Errors {
  name: string;
  age: string;
}

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorMessage = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorMessage}
      error={!!errorMessage}
    />
  );
};

export default function Question1() {
  const agesArray: string[] = [];
  const [value, setValue] = React.useState<Date | null>(null);
  const [ages, setAges] = useState<string[]>([]);

  const getAges = (): string[] => {
    for (let i = 1; i <= 70; i++) {
      const num: string = i.toString();
      agesArray.push(num);
    }
    return agesArray;
  };

  useEffect(() => {
    setAges(getAges());
  }, []);

  const initialValues = {
    name: '',
    selectAge: {},
    active: true,
    dateTime: new Date(),
  };

  return (
    <Container sx={{ pt: 2 }}>
      <Grid>
        <Link href="/" passHref>
          <ListItemButton component="a">
            <ListItemText>Back to Home</ListItemText>
          </ListItemButton>
        </Link>
        <Link href="/question2" passHref>
          <ListItemButton component="a">
            <ListItemText>Go to Question 2</ListItemText>
          </ListItemButton>
        </Link>
      </Grid>

      <Typography variant="h5">Question 1</Typography>
      <Typography>Design a form with Formik and Material UI</Typography>
      <Typography>Contains the following items: </Typography>
      <List>
        <ListItem>
          <ListItemText>Name</ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText>Date (datetime)</ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText>Active (boolean switch)</ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText>Age (select from 1 to 70)</ListItemText>
        </ListItem>
      </List>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: Partial<Errors> = {};
          if (!values.name) {
            errors.name = 'Name is required';
          } else if (values.name.length < 3) {
            errors.name = 'Name should be at least 3 characters';
          } else if (!values.selectAge) {
            errors.age = 'You must select an age';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 1000);
        }}
      >
        {({ errors, isSubmitting, handleChange }) => (
          //   <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Form>
            {isSubmitting && <LinearProgress />}
            <Box margin={1}>
              <MyTextField placeholder="Name" name="name" type="input" />
            </Box>
            <Box margin={1}>
              <FormControlLabel
                control={<Switch defaultChecked onChange={handleChange} />}
                label="Active"
                name="active"
              />
            </Box>

            {/* 
              <DateTimePicker
                label="DateTimePicker"
                inputVariant="outlined"
                value={selectedDate}
                onChange={handleDateChange}
              /> */}

            <Box margin={1}>
              <TextField
                style={{ width: '200px' }}
                variant="outlined"
                name="selectAge"
                select
                label="Select your age"
                onChange={handleChange}
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem key={''} value={''}>
                  No age selected
                </MenuItem>
                {ages.length > 0 &&
                  ages.map((age, i) => (
                    <MenuItem key={i} value={age}>
                      {age}
                    </MenuItem>
                  ))}
              </TextField>
            </Box>
            <Box margin={1}>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </Form>
          //   </MuiPickersUtilsProvider>
        )}
      </Formik>
    </Container>
  );
}
