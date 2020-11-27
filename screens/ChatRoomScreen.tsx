import React, {useEffect, useState} from 'react';
import {FlatList, Text, ImageBackground, KeyboardAvoidingView } from 'react-native';

import { useRoute } from '@react-navigation/native';
import {
  API,
  graphqlOperation,
  Auth,
} from 'aws-amplify';


import ChatMessage from "../components/ChatMessage";
import BG from '../assets/images/BG.png';
import InputBox from "../components/InputBox";
import { messagesByChatRoom } from '../graphql/queries';
import { onCreateMessage } from '../graphql/subscriptions';

const ChatRoomScreen = () => {

  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState(null);

  const route = useRoute();

  const fetchMessages = async () => {
    const messagesData = await API.graphql(
      graphqlOperation(
        messagesByChatRoom, {
          chatRoomID: route.params.id,
          sortDirection: "DESC",
        }
      )
    )

    console.log("FETCH MESSAGES")
    setMessages(messagesData.data.messagesByChatRoom.items);
  }

  useEffect(() => {
    fetchMessages();
  }, [])

  useEffect(() => {
    const getMyId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyId(userInfo.attributes.sub);
    }
    getMyId();
  }, [])

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (data) => {
        const newMessage = data.value.data.onCreateMessage;

        if (newMessage.chatRoomID !== route.params.id) {
          console.log("Message is in another room!")
          return;
        }

        fetchMessages();
        set//Messages([newMessage, ...messages]);
      }
    });

    return () => subscription.unsubscribe();
  }, [])

  console.log(`messages in state: ${messages.length}`)

  return (
    <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
        inverted
      />

      <InputBox chatRoomID={route.params.id} />
    </ImageBackground>
  );
}

export default ChatRoomScreen;

// For message
// mutation MyMutation {
//     createMessage(input: {chatRoomID: "ad814fc7-702f-4df7-b734-959dda199478", userID: "c7ec78f0-df2f-463a-94d1-fe64da568887", content: "Hey Asl ;huhfi"}) {
//       id
//       createdAt
//       content
//       userID
//       chatRoomID
//       user {
//         id
//         name
//         imageUri
//         status
//         chatRoomUser {
//           nextToken
//         }
//         createdAt
//         updatedAt
//       }
//       chatRoom {
//         id
//         chatRoomUsers {
//           nextToken
//         }
//         messages {
//           nextToken
//         }
//         lastMessageID
//         lastMessage {
//           id
//           createdAt
//           content
//           userID
//           chatRoomID
//           updatedAt
//         }
//         createdAt
//         updatedAt
//       }
//       updatedAt
//     }
//   }
  