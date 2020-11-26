import React from 'react'
import { View, Text, FlatList, ImageBackground } from 'react-native'
import { useRoute } from '@react-navigation/native';
import chatRoomData from '../data/chats';
import ChatMessage from '../components/ChatMessage';
import BG from '../assets/images/BG.png'

export default function ChatRoomScreen() {
    const route = useRoute()

    return (
        <ImageBackground source={BG} style={{ width: '100%' }}>
            <FlatList data={chatRoomData.messages}
                renderItem={({ item }) => <ChatMessage message={item} />}
                inverted />
        </ImageBackground>

    )
}
