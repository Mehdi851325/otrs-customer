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
    Article:Article
  }    
}
type Article = {
  ArticleNumber: number;
  Subject: string;
  From: string;
  To: string;
  Body: string;
  Attachment: [Attachment];
};
interface Attachment {
  Content: string;
  Filename: string;
  ContentType: string;
}
type ticketListQueue={
  SessionID: string| null;
  TicketID:number;
  ArticleSenderType?:string[];
  AllArticles?:number;
  Attachments:number;
}


export const apiSliceHR = createApi({
  reducerPath: "apiHR",
  baseQuery: fetchBaseQuery({ baseUrl: "https://support-api.si24.ir:23000" }),
  endpoints: (builder) => ({
    sessionLoginHR: builder.mutation<DataSession,IFormState>({
      query: (session) => ({
        url: "/Session",
        method: "POST",
        body: session,
      }),
    }),
    sessionGetHR: builder.mutation({
      query:(sessionId) => ({
        url: "/Session",
        method: "PUT",
        body: sessionId
      })
    }),
    ticketSearchHR: builder.mutation<ticketSearchType,ticketSearchQueue>({
      query:(Queue) =>({
        url:"/TicketSearch",
        method: "PUT",
        body: Queue
      })
    }),
    ticketListHR: builder.mutation<ticketListType,ticketListQueue>({
      query:(ticketId) =>({
        url:"/TicketList",
        method: "PUT",
        body: ticketId
      })
    }),
    ticketCreateHR: builder.mutation({
      query:(ticketInfo)=>({
        url:"/Ticket",
        method:"POST",
        body:ticketInfo
      })
    }),
    ticketUpdateHR: builder.mutation({
      query:(detailTicket) =>({
        url:"/Ticket",
        method: "PATCH",
        body: detailTicket
      })
    }),
  }),
});



export const { useSessionLoginHRMutation , useSessionGetHRMutation , useTicketSearchHRMutation ,useTicketListHRMutation,useTicketCreateHRMutation,useTicketUpdateHRMutation } = apiSliceHR;
// export const {useSessionGetMutation} =userSlice;
