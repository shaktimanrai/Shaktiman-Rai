import React from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";


const data = [
  {
    Image: "https://www.computerhope.com/jargon/g/guest-user.jpg",
    Id: "1234567890sadd",
    Customer: "Aayush Kashyap",
    OrderDate: "7835878473",
    DeliveryDate: "kashyapaayush3945@gmail.com",
  },
  {
    Image: "https://www.computerhope.com/jargon/g/guest-user.jpg",
    Id: "dsa1ds4d1sd346431",
    Customer: "Kashyap",
    OrderDate: "7835878473",
    DeliveryDate: "kashyapaayush3945@gmail.com",
  },
  {
    Image: "https://www.computerhope.com/jargon/g/guest-user.jpg",
    Id: "1234567890sadd",
    Customer: "Aayush",
    OrderDate: "7835878473",
    DeliveryDate: "kashyapaayush3945@gmail.com",
  },
  {
    Image: "https://www.computerhope.com/jargon/g/guest-user.jpg",
    Id: "1234567890sadd",
    Customer: "Aayush",
    OrderDate: "7835878473",
    DeliveryDate: "kashyapaayush3945@gmail.com",
  },
];

const Payment = () => {

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Payments
          </span>
        </div>
      </section>

      <Table
        striped
        bordered
        hover
        style={{
          marginTop: "5%",
          scrollBehavior: "smooth",
          overflow: "scroll",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Order</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i) => (
            <tr>
              <td> {i.Id} </td>
              <td> dsa1ds4d1sd346431 </td>
              <td> dsa1ds4d1sd346431 </td>
              <td> $500 </td>
              <td>Online</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Payment);
