import React, { useState } from "react";

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
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemNotes, setItemNotes] = useState("");
  const [items, setItems] = useState([]);
  const [prices, setPrices] = useState([]);

  function FormattedPrices(obj) {
      console.log(arguments);
    return obj.prices.map((price, i) => {
      return (
        <span className="pr-10" key={i}>
          {price.size} - <strong>{price.price}</strong>
        </span>
      );
    });
  }
  function FormattedMenuItems() {
    return items.map((item, i) => {
      return (
        <li key={i}>
          {item.category}
          <br />
          {item.name}
          <br />
          {item.description}
          <br />
          {item.notes}
          <br />
          <FormattedPrices prices={item.prices}></FormattedPrices>
        </li>
      );
    });
  }

  function addMenuItem() {
    let itemsClone = items.slice(0);
    itemsClone.push({
      category: category,
      name: itemName,
      description: itemDescription,
      notes: itemNotes,
      prices: prices.slice(0)
    });
    setItems(itemsClone);
    setPrices([]);
    console.log(itemsClone);
  }

  function addMenuItemPrice() {
    let pricesClone = prices.slice(0);
    pricesClone.push({
      price: price,
      size: size
    });
    setPrices(pricesClone);
  }

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
        sunday_open: sundayOpen,
        sunday_close: sundayClose,
        monday_open: mondayOpen,
        monday_close: mondayClose,
        tuesday_open: tuesdayOpen,
        tuesday_close: tuesdayClose,
        wednesday_open: wednesdayOpen,
        wednesday_close: wednesdayClose,
        thursday_open: thursdayOpen,
        thursday_close: thursdayClose,
        friday_open: fridayOpen,
        friday_close: fridayClose,
        saturday_open: saturdayOpen,
        saturday_close: saturdayClose
      })
    });
    const data2JSON = await data2.json();

    const data3 = await fetch("/api/menus/" + restaurantId, {
      method: "POST",
      body: JSON.stringify({ notes, "menu_items": items })
    });
    const data3JSON = await data3.json();
    console.log(dataJSON, data2JSON, data3JSON);
  }

  return (
    <div>
      <form onSubmit={submitRestaurant}>
        <div className="container mt-15">
          <div>
            <strong>Restaurant Details:</strong> <br />
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
          </div>
          <div className="pl-20">
            <strong>Hours:</strong> <br />
            Sunday:
            <input
              type="text"
              name="sunday_open"
              placeholder="open"
              onChange={e => setSundayOpen(e.target.value)}
            />{" "}
            -{" "}
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
            />{" "}
            -{" "}
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
              onChange={e => setTuesdayOpen(e.target.value)}
            />{" "}
            -{" "}
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
            />{" "}
            -{" "}
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
            />{" "}
            -{" "}
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
            />{" "}
            -{" "}
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
            />{" "}
            -{" "}
            <input
              type="text"
              name="saturday_close"
              placeholder="close"
              onChange={e => setSaturdayClose(e.target.value)}
            />
            <br />
          </div>
          <div className="pl-20">
            <strong>Menu</strong>
            <div className="container">
              <div>
                Notes:{" "}
                <input
                  type="text"
                  name="notes"
                  placeholder="best menu in the world"
                  onChange={e => setNotes(e.target.value)}
                />
                <br />
                <strong>Item Price:</strong>
                <br />
                Price:{" "}
                <input
                  type="text"
                  name="price"
                  placeholder="10.00"
                  onChange={e => setPrice(e.target.value)}
                />
                <br />
                Size:{" "}
                <input
                  type="text"
                  name="size"
                  placeholder="Largo"
                  onChange={e => setSize(e.target.value)}
                />
                <br />
                <button type="button" onClick={addMenuItemPrice}>
                  Add Menu Item Price
                </button>
                <br />
                <strong>Menu Items:</strong>
                <br />
                Category:{" "}
                <input
                  type="text"
                  name="category"
                  placeholder="Pizza"
                  onChange={e => setCategory(e.target.value)}
                />
                <br />
                Name:{" "}
                <input
                  type="text"
                  name="itemName"
                  placeholder="Pizza Penne"
                  onChange={e => setItemName(e.target.value)}
                />
                <br />
                Description:{" "}
                <input
                  type="text"
                  name="itemDescription"
                  placeholder="Best Pizza"
                  onChange={e => setItemDescription(e.target.value)}
                />
                <br />
                Notes:{" "}
                <input
                  type="text"
                  name="itemNotes"
                  placeholder="A nice slice of pie"
                  onChange={e => setItemNotes(e.target.value)}
                />
                <br />
                <button type="button" onClick={addMenuItem}>
                  Add Menu Item
                </button>
              </div>
              <div className="main">
                Notes: {notes}
                <br />
                <ul>
                  <FormattedMenuItems></FormattedMenuItems>
                </ul>
                <br />
              </div>
            </div>
          </div>
        </div>
        <button type="submit">Create Restaurant</button>
      </form>
    </div>
  );
}

export default CreateRestaurant;
