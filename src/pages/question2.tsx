import {
  Container,
  Grid,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

type User = {
  id: string;
  name: string;
};

type ErrorMessage = {
  hasError: boolean;
};

type Data = {
  message: ErrorMessage;
  users: User[];
};

export default function Question2() {
  const [userData, setUserData] = useState<Data | ErrorMessage>();

  const handleClick = () => {
    axios
      .get<Data | ErrorMessage>('http://localhost:3000/api/user')
      .then((res) => {
        setUserData(res.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Container sx={{ pt: 2 }}>
      <Grid>
        <Link href="/question1" passHref>
          <ListItemButton component="a">
            <ListItemText>Go to Question 1</ListItemText>
          </ListItemButton>
        </Link>
        <Link href="/question3" passHref>
          <ListItemButton component="a">
            <ListItemText>Go to Question 3</ListItemText>
          </ListItemButton>
        </Link>
      </Grid>
      <Typography variant="h5">Question 2</Typography>
      <Typography>
        Create an api function in NextJS that takes an object with this type{' '}
        {'{id: string, name: test}'}[] and converts it to {'{id: name}'}
      </Typography>
      <Typography>
        Perform error handling so that any object without that shape will throw
        an error.
      </Typography>
      <Typography>Call the function from a button press</Typography>
      <Typography>You can use any library for this</Typography>
      <Button color="primary" variant="contained" onClick={handleClick}>
        Get User
      </Button>
      <ul>
        {userData?.id !== undefined &&
          userData?.id.map(({ id: name }, i) => <li key={i}>{name}</li>)}
      </ul>
    </Container>
  );
}
