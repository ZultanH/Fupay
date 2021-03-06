// return the customer data from the session storage
export const getCustomer = () => {
    const customerStr = sessionStorage.getItem('customer');
    if (customerStr) 
      return JSON.parse(customerStr);
    else 
      return null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeCustomerSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('customer');
}

// set the token and customer from the session storage
export const setCustomerSession = (token, customer) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('customer', JSON.stringify(customer));
}

export const setCustomerToken = (token) => {
  sessionStorage.setItem('token', token);
}

export const setSession = (customer) => {
  sessionStorage.setItem('customer', JSON.stringify(customer))
}
