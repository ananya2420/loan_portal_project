//form progress indicator at the top

//user can navigate Back/next between step


import { createContext, useEffect, useState } from "react";


export const formContext = createContext();

export const FromProvider = ({ children }) => {

  const [page, setPage] = useState(0);
  const title = {
    0: "personal info",
    1: "Employee details",
    2: "Tax ID",
    3: "Loan Details",
    4: "Document updates"

  };

  

  const [data, setData] = useState({
    fullName: "",
    dateofbirth: "",
    phonenumber: "",
    email: "",
    sameAsEmployee: false,
    employeeFullName: "",
    employeeDateofbirth: "",
    employeePhoneNumber: "",
    employeeEmail: ""
  });

  useEffect(() => {
    if (data.sameAsEmployee) {
      setData((prevData) => ({
        ...prevData,
        fullName: prevData.employeeFullName,
        dateofbirth: prevData.employeeDateofbirth,
        phonenumber: prevData.employeePhoneNumber,
        email: prevData.employeeEmail
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        fullName: "",
        dateofbirth: "",
        phonenumber: "",
        email: ""
      }));
    }
  }, [data.sameAsEmployee]);

  const handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value 
    }));
  };

  return (
    <formContext.Provider value={{ page, setPage, data, setData, handleChange, title }}>
      {children}
    </formContext.Provider>
  );
};