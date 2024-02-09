import { Badge, Table } from "@radix-ui/themes";
import delay from "delay";
import LoadingListTicket from "./LoadingListTicket";
import { useNavigate } from "react-router-dom";

const statusMap: Record<
  string,
  { label: string; color: "green" | "violet" | "red" | "yellow" }
> = {
  new: { label: "new", color: "green" },
  open: { label: "open", color: "violet" },
  closed: { label: "closed", color: "red" },
  "pending reminder": { label: "pending", color: "yellow" },
};

type Tickets = {
  TicketNumber: number;
  Title: string;
  Owner: string;
  CustomerUserID: string;
  StateType: string;
  TicketID?: number;
};

type Props = {
  tickets: Tickets[];
  queue?: string;
  isLoading: boolean;
};

const ListTicket = ({ tickets, queue, isLoading }: Props) => {
  const navigate = useNavigate();
  delay(2000);
  console.log(tickets);
  if (isLoading) {
    return <LoadingListTicket />;
  }
  return (
    <div className=" w-11/12 justify-end flex mt-8 font-shabnam">
      <Table.Root className="w-full" variant="surface">
        <Table.Header className="text-right">
          <Table.Row>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Owner</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Sender</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Ticket Number</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Queue</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body className="text-right">
          {tickets &&
            tickets.map((ticket) => (
              <Table.Row
                key={ticket.TicketNumber}
                className="text-right hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate(`/ticket/${ticket.TicketID}`)}
              >
                <Table.Cell>
                  <Badge color={statusMap[ticket.StateType].color}>
                    {statusMap[ticket.StateType].label}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{ticket.Title}</Table.Cell>
                <Table.Cell>{ticket.Owner}</Table.Cell>
                <Table.Cell>{ticket.CustomerUserID}</Table.Cell>
                <Table.Cell>{ticket.TicketNumber}</Table.Cell>
                <Table.Cell>
                  <button className="bg-secondary-IT py-1 px-3 rounded-md">
                    {queue}
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default ListTicket;
