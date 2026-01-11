export const mockUsers = [
  {
    id: "u1",
    name: "Riya Mohile",
    phone: "9876543210",
    email: "riya@gmail.com",
    address: "Gwalior",
    status: "Active",
  },
  {
    id: "u2",
    name: "Aman Verma",
    phone: "9876543222",
    email: "aman@gmail.com",
    address: "Indore",
    status: "Inactive",
  },
  {
    id: "u3",
    name: "Rahul Sharma",
    phone: "9876543233",
    email: "rahul@gmail.com",
    address: "Bhopal",
    status: "Active",
  },
];


export const mockDrivers = [
  {
    id: "d1",
    name: "Rahul Driver",
    phone: "9876543333",
    email: "rahul.driver@gmail.com",
    vehicleType: "Bike",
    vehicleNumber: "MP09 AB 1234",
    licenseNumber: "LIC12345",
    status: "Active",
  },
  {
    id: "d2",
    name: "Amit Driver",
    phone: "9876543444",
    email: "amit.driver@gmail.com",
    vehicleType: "Car",
    vehicleNumber: "MP04 XY 5678",
    licenseNumber: "LIC67890",
    status: "Inactive",
  },
];


export const mockOrders = [
  {
    id: "ORD-101",
    userName: "Riya Mohile",
    amount: 260,
    paymentMethod: "COD",
    status: "Delivered",
    items: [
      { name: "Apple", qty: 2, price: 100 },
      { name: "Milk", qty: 1, price: 60 },
    ],
  },
  {
    id: "ORD-102",
    userName: "Aman Verma",
    amount: 180,
    paymentMethod: "Online",
    status: "Pending",
    items: [
      { name: "Bread", qty: 2, price: 90 },
    ],
  },
  {
    id: "ORD-103",
    userName: "Rahul Sharma",
    amount: 420,
    paymentMethod: "COD",
    status: "Cancelled",
    items: [
      { name: "Rice", qty: 2, price: 210 },
    ],
  },
];
