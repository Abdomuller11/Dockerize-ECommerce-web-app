//import React from "react";
import React ,{ useState, useEffect } from 'react';
//import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";
import { Text, Button, Alert, AlertIcon, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// eslint-disable-next-line
function Profile({ }) {
  const { user, logout, loggedIn } = useAuth();
  
  const [hostname, setHostname] = useState('');

  useEffect(() => {
    if (loggedIn) {
      fetch('http://localhost:8000/api/hostname')
        .then(response => response.json())
        .then(data => {
          const { myhostname } = data;
          setHostname(myhostname);
        })
        .catch(error => {
          console.error('Error fetching hostname:', error);
        });
    }
  }, [loggedIn]);

  const handleLogout = async () => {
    logout();
  };
  
  return (
    <div>
      {loggedIn === false && (
        <>
          <Alert status="warning">
            <AlertIcon />
            You are not logged in. please login and try again.
          </Alert>
          <Link to="/signin">
            <Button mt={4} colorScheme="whatsapp" variant="solid">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button mt={4} ml={4} colorScheme="facebook" variant="solid">
              Register
            </Button>
          </Link>
        </>
      )}
      {loggedIn === true && (
        <>
          <Text fontSize={28} fontWeight={700}>
            Profile
          </Text>
          <Box mt={4}>
            <Text fontSize={20}>email: {user.email}</Text>
            <Text fontSize={20}>role: {user.role}</Text>
            <Text fontSize={22}>only for testing in cloud project: 
             <Text fontSize={20} color="red.500" marginLeft={8}>
                hostname that retrieved from redis:  {hostname}
            </Text> 
           </Text>
          </Box>

          <br />
          <br />
          <Link to="/">
            <Button colorScheme="pink" variant="solid" onClick={handleLogout}>
              Logout
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Profile;
