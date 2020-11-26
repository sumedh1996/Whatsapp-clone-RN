import React from 'react'
import { View, Text, FlatList } from 'react-native'
import ChatListItem from '../components/ChatListItem';

import chatRooms from '../data/chatRooms'
import NewMessageButton from '../components/NewMessageButton';

export default function ChatsScreen() {
    return (
        <View style={{ backgroundColor: 'white' }}>
            <FlatList
                data={chatRooms}
                renderItem={({ item }) => <ChatListItem chatRoom={item} />}
                keyExtractor={item => item.id}

            />
            <NewMessageButton />
        </View>
    )
}
