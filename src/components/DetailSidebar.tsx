import QueuesSM from "../data/QueuesSM";

type DetailTicketType = {
    Age: number;
    TicketNumber: number;
    State: string;
    Priority: string;
    Queue: string;
    Owner: string;
    StateType: string;
  };
  type Props={
    detailTicket:DetailTicketType
  }
const DetailSidebar = ({detailTicket}:Props) => {

    const queueName = () => {
        if (detailTicket) {
          const findQueueName = QueuesSM.find(
            (queue) => queue.data === detailTicket.Queue
          );
          return findQueueName;
        }
      };
      
      const convertSeconds = (seconds: number): string => {
        const day = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
    
        if (day > 0) {
          return `${day}روز و ${hours}ساعت `;
        } else if (hours > 0) {
          return `${hours} ساعت${hours > 1 ? "" : ""} و ${minutes} دقیقه${
            minutes > 1 ? "" : ""
          }`;
        } else {
          return `${minutes} دقیقه${minutes > 1 ? "" : ""}`;
        }
      };

  return (
    <div className="w-2/12 h-full border-2 mt-4 rounded-md">
          <div className="border-b-2 p-2 bg-primary-200">مشخصات درخواست</div>
          <div className="border-2 p-2 ">
            {detailTicket && (
              <ul className="space-y-4">
                <li>
                  <span className="font-bold text-gray-500">
                    شماره&nbsp;&nbsp;:&nbsp;&nbsp;
                  </span>
                  {detailTicket.TicketNumber}
                </li>
                <li>
                  <span className="font-bold text-gray-500">
                    وضعیت&nbsp;&nbsp;:&nbsp;&nbsp;
                  </span>
                  {detailTicket.State}
                </li>
                <li>
                  <span className="font-bold text-gray-500">
                    اولویت&nbsp;&nbsp;:&nbsp;&nbsp;
                  </span>
                  {detailTicket.Priority}
                </li>
                <li>
                  <span className="font-bold text-gray-500">
                    واحد&nbsp;&nbsp;:&nbsp;&nbsp;
                  </span>
                  {queueName()?.name}
                </li>
                <li>
                  <span className="font-bold text-gray-500">
                    زمان&nbsp;&nbsp;:&nbsp;&nbsp;
                  </span>
                  {convertSeconds(detailTicket.Age)}
                </li>
              </ul>
            )}
          </div>
        </div>
  )
}

export default DetailSidebar