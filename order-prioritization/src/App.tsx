import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import "./App.css";

const SERVICE_HOSTNAME: string = import.meta.env.VITE_SERVICE_HOSTNAME;

const ORDER_BASE_URL: string = `${SERVICE_HOSTNAME}/api/v1/orders`;

interface OrderLineItem {
  id: string;
  customer: string;
  volume: number;
  value: number;
  order: number;
  priority: number;
}

interface OrderTableProps {
  data: OrderLineItem[];
  type: "active" | "received";
}

const OrderTable: React.FC<OrderTableProps> = ({ data, type }) => {
  function handlePrioritize(orderId: string) {
    fetch(`${ORDER_BASE_URL}/priority/${orderId}`);
  }

  return (
    <table
      className={
        "table table-striped table-hover " +
        (type === "active" ? "table-warning" : "table-light")
      }
    >
      <thead>
        <tr>
          <th>#</th>
          <th>Order Id</th>
          <th>Customer</th>
          <th>Quantity</th>
          <th>Price</th>
          {type === "active" ? <th>Prioritize</th> : <th>Priority</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((order, index) => (
          <tr key={order.id + index + type}>
            <td>{order.order}</td>
            <td>{order.id}</td>
            <td>{order.customer}</td>
            <td>{order.volume}</td>
            <td>{order.value}</td>
            {type === "active" ? (
              <td>
                <button
                  type="button"
                  className="btn btn-light position-relative"
                  onClick={() => handlePrioritize(order.id)}
                >
                  Prioritize
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {order.priority}
                  </span>
                </button>
              </td>
            ) : (
              <td>{order.priority}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function App() {
  const [activeOrders, setActiveOrders] = useState([]);
  const [receivedOrders, setReceivedOrders] = useState([]);

  async function fetchActiveOrders() {
    let activeOrdersResp = await fetch(`${ORDER_BASE_URL}/active`);
    let activeOrdersJson = await activeOrdersResp.json();
    setActiveOrders(activeOrdersJson);
  }

  async function fetchReceivedOrders() {
    let receivedOrdersResp = await fetch(`${ORDER_BASE_URL}/received`);
    let receivedOrdersJson = await receivedOrdersResp.json();
    setReceivedOrders(receivedOrdersJson);
  }

  useEffect(() => {
    let timerId = setInterval(() => {
      fetchActiveOrders();
      fetchReceivedOrders();
    }, 1300);
    fetchActiveOrders();

    return () => {
      clearInterval(timerId);
    };
  }, []);

  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function createBulkOrders() {
    let count = randomInt(10, 25);
    fetch(`${ORDER_BASE_URL}/publish-bulk/${count}`);
  }

  return (
    <>
      <h2>{import.meta.env.VITE_service_hostname}</h2>
      <div className="container text-center">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={() => createBulkOrders()}
          >
            Create Bulk Orders
          </button>
        </div>

        <div className="row align-items-start">
          <div className="col">
            <h1>Active Orders</h1>
            <OrderTable data={activeOrders} type="active" />
          </div>
          <div className="col">
            <h1>Reccived Orders</h1>
            <OrderTable data={receivedOrders} type="received" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
