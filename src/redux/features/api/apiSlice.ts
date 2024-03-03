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
  Queue:{
    SessionID: string| null,
    Title: string;
    CustomerUserLogin?:string;
    States?:string[];
  }
  port:string
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
  ticketId:{
    SessionID: string| null;
    TicketID:number;
    ArticleSenderType: string[] | null;
    AllArticles: number | null;
    Attachments: number | null;
  }
  port:string
}


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://support-api.si24.ir:15000" }),
  
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
      query:(ticketIdArg) =>{
        const {ticketId,port} = ticketIdArg
        const baseUrl = port ? `https://support-api.si24.ir:${port}` : "https://support-api.si24.ir";
        return{
          url:`${baseUrl}/TicketList`,
          method: "PUT",
          body: ticketId
        }
      }
    }),
    ticketCreate: builder.mutation({
      query:(ticketInfoArg)=>{
        const {ticketInfo,port} = ticketInfoArg
        const baseUrl = port ? `https://support-api.si24.ir:${port}` : "https://support-api.si24.ir";
        return{
          url:`${baseUrl}/Ticket`,
          method:"POST",
          body:ticketInfo
        }
      }

    }),
    ticketUpdate: builder.mutation({
      query:(detailTicketArg) =>{
        const {detailTicket,port} = detailTicketArg
        const baseUrl = port ? `https://support-api.si24.ir:${port}` : "https://support-api.si24.ir";
        return{
          url:`${baseUrl}/Ticket`,
          method: "PATCH",
          body: detailTicket
        }
      }
    }),
    
  }),
});



export const { useSessionLoginMutation , useSessionGetMutation , useTicketSearchMutation ,useTicketListMutation,useTicketCreateMutation,useTicketUpdateMutation } = apiSlice;
// export const {useSessionGetMutation} =userSlice;
