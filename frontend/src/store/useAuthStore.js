import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';
import {io} from "socket.io-client";

const url = import.meta.env.MODE === "development" ? 'http://localhost:5001' : '/';


export const userAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers:[],
    socket:null,

    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            set({ authUser: null });

        }
        finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("account created success");

            get().connectSocket();

        } catch (error) {
            toast.error(error.response.data.message);

        }

        finally {
            set({ isSigningUp: false })
        }
    },

    login:async (data) =>{
        set({isLoggingIn:true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser:res.data});
            toast.success("Logged in successfully");


            get().connectSocket();

        } catch (error) {
            toast.error(error.response.data.message);

            
        }finally{
            set({isLoggingIn:false});
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out man")
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.mesage);
            
        }
    },

    updateProfile: async(data) =>{

        set({isUpdatingProfile:true});

        try {
            const res= await axiosInstance.put("/auth/update-profile", data);
            set({authUser:res.data});
            toast.success("Profile update gang")

        } catch (error) {
            console.log("error in profile", error);
            toast.error(error.response.data.mesage)
        }
        finally{
            set({
                isUpdatingProfile:false
            })
        }

    },

    connectSocket: () =>{
        const {authUser} = get();
        if (!authUser || get().socket?.connected) return;
        const socket = io(url, {
            query: {
                userId: authUser._id,
            }
        });
        socket.connect();

        set({socket:socket});

        socket.on("getOnlineUsers", (userIds) =>{
            set({onlineUsers:userIds});
        });
    },

    disconnectSocket: () =>{
        if(get().socket?.connected) get().socket.disconnect();
    },


}))


// stopping here for day currently working on implementing realtime sockets for messaging 4:24:43
// next things to implement: online users, messages collection