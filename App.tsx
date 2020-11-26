import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'
import config from './aws-exports'
import { getUser } from './graphql/queries';
import { createUser } from './graphql/mutations';
Amplify.configure(config)

const randomImage = [
  "https://picsum.photos/200",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/?blur"
]

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return randomImage[Math.floor(Math.random() * randomImage.length)];
  }


  useEffect(() => {
    const fetchUser = async () => {
      //get authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
      //get the user from the backend with the userId from authentication
      if (userInfo) {

        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }))
        if (userData.data.getUser) {
          console.log("User is already registered")

        }
      }
      const newUser = {
        id: userInfo.attributes.sub,
        name: userInfo.username,
        imageUri: getRandomImage(),
        status: "Hey, I am using WhatsApp"

      }

      await API.graphql(graphqlOperation(createUser, {input: newUser}))

      //If no user in database with the id then create one

    }

    fetchUser();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
export default withAuthenticator(App);