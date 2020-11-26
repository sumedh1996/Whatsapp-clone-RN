import React from 'react'
import { View, Text, FlatList } from 'react-native'
import ChatListItem from '../components/ChatListItem';

import chatRooms from '../data/chatRooms'

export default function ChatsScreen() {
    return (
        <View>
            <FlatList
                data={chatRooms}
                renderItem={({ item }) => <ChatListItem chatRoom={item} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}
