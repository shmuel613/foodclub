import React, { useState, useEffect } from "react";

function CreateRestaurant() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [sundayOpen, setSundayOpen] = useState("");
  const [sundayClose, setSundayClose] = useState("");
  const [mondayOpen, setMondayOpen] = useState("");
  const [mondayClose, setMondayClose] = useState("");
  const [tuesdayOpen, setTuesdayOpen] = useState("");
  const [tuesdayClose, setTuesdayClose] = useState("");
  const [wednesdayOpen, setWednesdayOpen] = useState("");
  const [wednesdayClose, setWednesdayClose] = useState("");
  const [thursdayOpen, setThursdayOpen] = useState("");
  const [thursdayClose, setThursdayClose] = useState("");
  const [fridayOpen, setFridayOpen] = useState("");
  const [fridayClose, setFridayClose] = useState("");
  const [saturdayOpen, setSaturdayOpen] = useState("");
  const [saturdayClose, setSaturdayClose] = useState("");

  async function submitRestaurant(evt) {
    evt.preventDefault();
    const data = await fetch("/api/restaurants", {
      method: "POST",
      body: JSON.stringify({ name, phone, address, description })
    });
    const dataJSON = await data.json();
    const restaurantId = dataJSON._id;
    const data2 = await fetch("/api/hours/" + restaurantId, {
      method: "POST",
      body: JSON.stringify({ 
          "sunday_open": sundayOpen,
          "sunday_close": sundayClose,
          "monday_open": mondayOpen,
          "monday_close": mondayClose,
          "tuesday_open": tuesdayOpen,
          "tuesday_close": tuesdayClose,
          "wednesday_open": wednesdayOpen,
          "wednesday_close": wednesdayClose,
          "thursday_open": thursdayOpen,
          "thursday_close": thursdayClose,
          "friday_open": fridayOpen,
          "friday_close": fridayClose,
          "saturday_open": saturdayOpen,
          "saturday_close": saturdayClose
       })
    });
    const data2JSON = await data2.json();
    console.log(dataJSON, data2JSON);
  }

  return (
    <div>
      Add Restaurant:
      <form onSubmit={submitRestaurant}>
        Name:{" "}
        <input
          type="text"
          name="name"
          placeholder="Alfredo's"
          onChange={e => setName(e.target.value)}
        />
        <br />
        Phone:{" "}
        <input
          type="text"
          name="phone"
          placeholder="1234567890"
          onChange={e => setPhone(e.target.value)}
        />
        <br />
        Address:{" "}
        <input
          type="text"
          name="address"
          placeholder="123 Sunnydale Dr."
          onChange={e => setAddress(e.target.value)}
        />
        <br />
        Description:{" "}
        <input
          type="text"
          name="description"
          placeholder="A great place to eat"
          onChange={e => setDescription(e.target.value)}
        />
        <br />
        <br />
        Hours: <br />
        Sunday:
        <input
          type="text"
          name="sunday_open"
          placeholder="open"
          onChange={e => setSundayOpen(e.target.value)}
        /> - 
        <input
          type="text"
          name="sunday_close"
          placeholder="close"
          onChange={e => setSundayClose(e.target.value)}
        />
        <br />
        Monday:
        <input
          type="text"
          name="monday_open"
          placeholder="open"
          onChange={e => setMondayOpen(e.target.value)}
        /> - 
        <input
          type="text"
          name="monday_close"
          placeholder="close"
          onChange={e => setMondayClose(e.target.value)}
        />
        <br />
        Tuesday:
        <input
          type="text"
          name="tuesday_open"
          placeholder="open"
          onChange={e => setSundayOpen(e.target.value)}
        /> - 
        <input
          type="text"
          name="tuesday_close"
          placeholder="close"
          onChange={e => setTuesdayClose(e.target.value)}
        />
        <br />
        Wednesday:
        <input
          type="text"
          name="wednesday"
          placeholder="open"
          onChange={e => setWednesdayOpen(e.target.value)}
        /> - 
        <input
          type="text"
          name="wednesday_close"
          placeholder="close"
          onChange={e => setWednesdayClose(e.target.value)}
        />
        <br />
        Thursday:
        <input
          type="text"
          name="thursday_open"
          placeholder="open"
          onChange={e => setThursdayOpen(e.target.value)}
        /> - 
        <input
          type="text"
          name="thursday_close"
          placeholder="close"
          onChange={e => setThursdayClose(e.target.value)}
        />
        <br />
        Friday:
        <input
          type="text"
          name="friday_open"
          placeholder="open"
          onChange={e => setFridayOpen(e.target.value)}
        /> - 
        <input
          type="text"
          name="friday_close"
          placeholder="close"
          onChange={e => setFridayClose(e.target.value)}
        />
        <br />
        Saturday:
        <input
          type="text"
          name="saturday_open"
          placeholder="open"
          onChange={e => setSaturdayOpen(e.target.value)}
        /> - 
        <input
          type="text"
          name="saturday_close"
          placeholder="close"
          onChange={e => setSaturdayClose(e.target.value)}
        />
        <br />
        <button type="submit">Create Restaurant</button>
      </form>
    </div>
  );
}

export default CreateRestaurant;
