import { createSlice } from '@reduxjs/toolkit';

const friendRequestSlice = createSlice({
    name: 'friendRequest',
    initialState: {
        incomingRequests: [],
        outgoingRequests: [],
        acceptedRequests: [],
        rejectedRequests: [],
    },
    reducers: {
        setFriendRequest: (state, action) => {
            state.incomingRequests = action.payload.incomingRequests;
            state.outgoingRequests = action.payload.outgoingRequests;
            state.acceptedRequests = action.payload.acceptedRequests;
            state.rejectedRequests = action.payload.rejectedRequests;
        }
    }
})

export const { setFriendRequest } = friendRequestSlice.actions
export default friendRequestSlice.reducer

