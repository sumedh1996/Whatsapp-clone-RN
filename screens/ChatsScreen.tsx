import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import ChatListItem from '../components/ChatListItem';
import NewMessageButton from '../components/NewMessageButton';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from './queries';
import { listUsers } from '../graphql/queries';

export default function ChatsScreen() {

    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const userInfo = await Auth.currentAuthenticatedUser();
                console.log("Hello World");
                const userData = await API.graphql(graphqlOperation(getUser, {
                    id: userInfo.attributes.sub
                }))

                setChatRooms(userData.data.getUser.chatRoomUser.items);
                console.log(userData)
            } catch (e) {

            }
        }
        fetchChatRooms();

    }, [])
    return (
        <View style={{ backgroundColor: 'white' }}>
            <FlatList
                data={chatRooms}
                renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
                keyExtractor={item => item.id}

            />
            <NewMessageButton />
        </View>
    )
}
