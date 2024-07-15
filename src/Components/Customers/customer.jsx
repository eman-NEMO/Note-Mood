import React, { useState, useEffect } from 'react';
import LineChartComponent from './LineChart'; // Assuming this is where your LineChartComponent is defined
import '../../Styles/style.scss';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchAmount, setSearchAmount] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    // Sample data initialization
    const initialCustomers = [
      { id: 1, name: 'Ahmed Ali' },
      { id: 2, name: 'Aya Elsayed' },
      { id: 3, name: 'Mina Adel' },
      { id: 4, name: 'Sarah Reda' },
      { id: 5, name: 'Mohamed Sayed' },
    ];

    const initialTransactions = [
      { id: 1, customer_id: 1, date: '2022-01-01', amount: 1000 },
      { id: 1, customer_id: 1, date: '2022-01-05', amount: 1000 },
      { id: 2, customer_id: 1, date: '2022-01-02', amount: 2000 },
      { id: 3, customer_id: 2, date: '2022-01-01', amount: 550 },
      { id: 3, customer_id: 2, date: '2022-01-07', amount: 1500 },
      { id: 4, customer_id: 3, date: '2022-01-01', amount: 500 },
      { id: 5, customer_id: 2, date: '2022-01-02', amount: 1300 },
      { id: 6, customer_id: 4, date: '2022-01-01', amount: 750 },
      { id: 7, customer_id: 3, date: '2022-01-02', amount: 1250 },
      { id: 8, customer_id: 5, date: '2022-01-01', amount: 2500 },
      { id: 8, customer_id: 5, date: '2022-01-03', amount: 2500 },
      { id: 9, customer_id: 5, date: '2022-01-02', amount: 875 },
    ];

    // Update state with initial data
    setCustomers(initialCustomers);
    setTransactions(initialTransactions);
    setFilteredCustomers(initialCustomers); // Initially set filtered customers to all customers
  }, []);

  // Function to handle name search input change
  const handleNameChange = (event) => {
    setSearchName(event.target.value);
    filterCustomers(event.target.value, searchAmount);
  };

  const handleAmountChange = (event) => {
    setSearchAmount(event.target.value);
    filterCustomers(searchName, event.target.value);
  };

  const filterCustomers = (name, amount) => {
    const filtered = customers.filter((customer) => {
      const nameMatch = customer.name.toLowerCase().includes(name.toLowerCase());
      const amountMatch = getTotalTransactions(customer.id) >= parseInt(amount) || amount === '';
      return nameMatch && amountMatch;
    });
    setFilteredCustomers(filtered);
  };

  const getCustomerData = (customerId) => {
    const customerTransactions = transactions
      .filter((trans) => trans.customer_id === customerId)
      .map((trans) => ({
        date: new Date(trans.date), // Convert date string to Date object
        amount: trans.amount,
      }))
      .sort((a, b) => a.date - b.date); // Sort by date

    // Extract dates and amounts
    const labels = customerTransactions.map((trans) => trans.date.toISOString().split('T')[0]); // Convert Date object back to string
    const data = customerTransactions.map((trans) => trans.amount);

    return { labels, data };
  };

  const getTotalTransactions = (customerId) => {
    const customerTransactions = transactions.filter((trans) => trans.customer_id === customerId);
    const totalAmount = customerTransactions.reduce((total, trans) => total + trans.amount, 0);
    return totalAmount;
  };

  return (
    <div className="container mt-5">
      <div className="d-flex m-4">
        <div className="w-50 m-2">
          <input
            className="form-control"
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={handleNameChange}
          />
        </div>
        <div className="w-50 m-2">
          <input
            className="form-control"
            type="number"
            placeholder="Search by total amount"
            value={searchAmount}
            onChange={handleAmountChange}
          />
        </div>
      </div>
      <div className="table-container">
        <table className="responsive-table">
          <thead className="color">
            <tr>
              <th>Name</th>
              <th>Total Transactions</th>
              <th>Graph</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={index}>
                <td data-label="Name">{customer.name}</td>
                <td data-label="Total Transactions">{getTotalTransactions(customer.id)}</td>
                <td data-label="Graph" className="graph-container">
                  {/* Pass dates and amounts to LineChartComponent */}
                  <LineChartComponent {...getCustomerData(customer.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
