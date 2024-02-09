import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface DataSession {
  code:number;
  data: Session[]
}
interface Session{
  SessionID:string

}
interface IFormState{
  UserLogin: string;
  Password: string;
}

type ticketSearchType={
  data:{
    TicketID:number
  }
     
}
type ticketSearchQueue={
  SessionID: string| null,
  Queue: string,
  Title: string
  CustomerUserLogin?:string
  States?:string[]
}

type ticketListType={
  data:{
    Ticket:{
      TicketNumber: number;
      Title: string;
      Owner: string;
      CustomerUserID: string;
      TicketID:number;
    }
  }
     
}
type ticketListQueue={
  SessionID: string| null;
  TicketID:number;
  ArticleSenderType?:string[];
  AllArticles?:number;
}


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://support-api.si24.ir:15000" }),
  endpoints: (builder) => ({
    sessionLogin: builder.mutation<DataSession,IFormState>({
      query: (session) => ({
        url: "/Session",
        method: "POST",
        body: session,
      }),
    }),
    sessionGet: builder.mutation({
      query:(sessionId) => ({
        url: "/Session",
        method: "PUT",
        body: sessionId
      })
    }),
    ticketSearch: builder.mutation<ticketSearchType,ticketSearchQueue>({
      query:(Queue) =>({
        url:"/TicketSearch",
        method: "PUT",
        body: Queue
      })
    }),
    ticketList: builder.mutation<ticketListType,ticketListQueue>({
      query:(ticketId) =>({
        url:"/TicketList",
        method: "PUT",
        body: ticketId
      })
    }),
    ticketCreate: builder.mutation({
      query:(ticketInfo)=>({
        url:"/Ticket",
        method:"POST",
        body:ticketInfo
      })
    }),
    ticketUpdate: builder.mutation({
      query:(detailTicket) =>({
        url:"/Ticket",
        method: "PATCH",
        body: detailTicket
      })
    }),
  }),
});



export const { useSessionLoginMutation , useSessionGetMutation , useTicketSearchMutation ,useTicketListMutation,useTicketCreateMutation,useTicketUpdateMutation } = apiSlice;
// export const {useSessionGetMutation} =userSlice;
