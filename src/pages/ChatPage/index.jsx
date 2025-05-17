import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getStreamTokenChat } from '../../apiCallls/getStreamToken';
import { useSelector } from 'react-redux';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageList, MessageInput, Thread, Window, LoadingIndicator } from 'stream-chat-react';
import { IoArrowBack } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import '@stream-io/stream-chat-css/dist/css/index.css';
function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const authUser = user?.data;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const streamApiKey = import.meta.env.VITE_STREAM_API_KEY;
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    let client;
    const initChat = async () => {
      if (!authUser) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const response = await getStreamTokenChat();
        client = StreamChat.getInstance(streamApiKey);
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.username,
            image: authUser.profilePicture,
          },
          response.token
        );
        setChatClient(client);
        const channelId = [id, authUser._id].sort().join('-');
        const newChannel = client.channel('messaging', channelId, {
          name: 'Chat',
          members: [id, authUser._id],
        });
        await newChannel.watch();
        setChannel(newChannel);
        setLoading(false);
      } catch (error) {
        console.error('Chat initialization error:', error);
        setError('Failed to initialize chat');
        setLoading(false);
      }
    };
    initChat();
    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [id, authUser, streamApiKey, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#111b21]">
        <div className="p-4 rounded-lg bg-white shadow-lg">
          <LoadingIndicator />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#111b21]">
        <div className="p-4 rounded-lg bg-white shadow-lg text-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (!chatClient || !channel) {
    return null;
  }

  // WhatsApp-like style overrides
  const whatsappStyles = {
    minHeight: '100vh',
    padding: 0,
    margin: 0,
    overflow: 'hidden',
  };

  return (
    <div style={{ ...whatsappStyles, overflow: 'hidden' }}>
      <div className="max-w-2xl mx-auto flex flex-col">
        {/* Header */}
        <div className="bg-[#202c33] shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => navigate(-1)}
                className="mr-4 p-2 hover:bg-[#2a3942] rounded-full transition-colors"
              >
                <IoArrowBack className="w-6 h-6 text-white" />
              </button>
              <div className="flex items-center">
                <img
                  src={channel.state.members[id]?.user?.image || 'https://ui-avatars.com/api/?name=User'}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-[#2a3942]"
                />
                <div>
                  <h1 className="text-base font-semibold text-white">
                    {channel.state.members[id]?.user?.name || 'User'}
                  </h1>
                  <p className="text-xs text-[#8696a0]">
                    {channel.state.members[id]?.user?.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 hover:bg-[#2a3942] rounded-full transition-colors"
            >
              <BsThreeDotsVertical className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
        {/* Chat Container */}
        <div className="flex-1 flex flex-col min-h-0 bg-[url('https://i.imgur.com/4M34hi2.png')] bg-cover bg-center overflow-hidden">
          <Chat client={chatClient} theme="messaging light">
            <Channel channel={channel} >
              <Window className="flex-1 min-h-0">
                <div className="flex flex-col h-full min-h-0" style={{height: '100vh', maxHeight: '100vh'}}>
                  <div className='flex-1 overflow-auto p-2 '>
                    <MessageList />
                  </div>
                  <div className="px-2 py-2">
                    <MessageInput />
                  </div>
                </div>
              </Window>
              <Thread />
            </Channel>
          </Chat>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;