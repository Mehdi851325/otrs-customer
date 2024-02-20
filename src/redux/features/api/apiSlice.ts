import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface DataSession {
  code:number;
  data: Session[]
}
interface Session{
  SessionID:string
}
interface IFormState{
  session: {
    UserLogin:string;
    Password:string;
  };
  port: string;
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


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://support-api.si24.ir" }),
  endpoints: (builder) => ({
    sessionLogin: builder.mutation<DataSession,IFormState>({
      query: (sessionarg) => {
        const {session ,port }=sessionarg
        const baseUrl = port ? `https://support-api.si24.ir:${port}` : "https://support-api.si24.ir";
        return{   
            url: `${baseUrl}/Session`,
            method: "POST",
            body: session,
            
        }
      },
    }),
    sessionGet: builder.mutation({
      query: (sessionArg) => {
        const {session ,port } = sessionArg
        const baseUrl = port ? `https://support-api.si24.ir:${port}` : "https://support-api.si24.ir";
        return{   
            url: `${baseUrl}/Session`,
            method: "PUT",
            body: session,
            
        }
      },
    }),
    ticketSearch: builder.mutation<ticketSearchType,ticketSearchQueue>({
      query:(QueueArg) =>{
        const {Queue ,port } = QueueArg
        const baseUrl = port ? `https://support-api.si24.ir:${port}` : "https://support-api.si24.ir";
        return{
          url:`${baseUrl}/TicketSearch`,
          method: "PUT",
          body: Queue
        }
      }
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
