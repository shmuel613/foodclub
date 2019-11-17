import React, { useReducer, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const servicePorts = {
  restaurants: 3000,
  hours: 4000,
  menus: 5000,
  orders: 8080,
  customers: 7000
};

function actionSort(a, b) {
    return a.service < b.service ? -1 : 1;
}

function statusReducer(state, action) {
  return action.sort(actionSort).map((result, i) => {
      const iconClass = result.status === 200 ? {icon: 'check-circle', color: 'green'} : {icon: 'times-circle', color: 'red'};
      return (
    <li key={i}>
      <FontAwesomeIcon icon={iconClass.icon} className={iconClass.color} /> {result.service}
    </li>
  )});
}

function Status() {
  const [status, dispatch] = useReducer(statusReducer, "");

  useEffect(() => {
    async function fetchStatus() {
      try {
        const results = await Promise.all(
          Object.keys(servicePorts).map(async service => {
            const data = await fetch("/api/status/" + service);
            return { service: service, status: data.status };
          })
        );
        dispatch(results);
      } catch (err) {
        dispatch({ service: "Error", status: JSON.stringify(err) });
      }
    }
    fetchStatus();
  }, []);

  return (
    <div>
      <div className="status-box">
        <strong>Services Status:</strong> <br /> 
        <ul>{status}</ul>
      </div>
    </div>
  );
}

export default Status;
