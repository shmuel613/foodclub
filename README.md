# FOODCLUB
Establish a new competition to the Cibus and 10Bis duopoly

# NOTES
While designing this, there were many areas I would have liked to improve upon, 
and may still in the future for my own enrichment. Some of those areas include:
 - Using the powers of docker-compose to contain all services except the NodeJS
   Orders service so that they are inaccessible from the outside.
 - Individual reviews of different restaurants and menu items, as opposed to just
   offering a rating
 - many improvements could be added to the API to accomodate more scenarios, such
   as, adding/updating/deleting individual prices from a menu item
 - many more enhancements, including the building of the UI


## Running Docker Compose
Simply navigate to the main folder of foodclub and run the following command:
 > docker-compose -f foodclub.yml up


## Seeding the database:
Please keep track of the following IDs to make building the queries more simple:
 - Restaurant ID
 - Customer ID
 - Menu Item IDs
 - Order ID

## Add a restaurant:
    POST to http://localhost:3000/restaurants
    BODY: {
            "name": "pizza penne",
            "phone": "cucumber",
            "address": "down the drain",
            "description": "The best pizza in town!"
        }
    Copy response _id to be used with populating hours and menus.
    This _id will be referred to as restaurant_id going forward

## Add hours to a restaurant
    POST to http://localhost:4000/hours/{restaurant_id}
    BODY: {
            "sunday_open": "09:00",
            "sunday_close": "23:30",
            "monday_open": "09:00",
            "monday_close": "23:30",
            "tuesday_open": "09:00",
            "tuesday_close": "23:30",
            "wednesday_open": "09:00",
            "wednesday_close": "23:30",
            "thursday_open": "09:00",
            "thursday_close": "23:30",
            "friday_open": "09:00",
            "friday_close": "23:30",
            "saturday_open": "09:00",
            "saturday_close": "23:30",
            "notes": "Closed all holidays"
        }

## Add a menu to a restaurant
    POST to http://localhost:5000/menus/{restaurant_id}
    BODY: {
            "menu_items": [{
                    "category": "pizza",
                    "name": "pizza parmegano",
                    "description": "a delicious-a pizza",
                    "prices": [{
                            "price": 21.00,
                            "size": "largo"
                        },
                        {
                            "price": 17.00,
                            "size": "mediumoso"
                        },
                        {
                            "price": 12.00,
                            "size": "teeny tiny"
                        }
                    ],
                    "notes": "abasolutely delicious!"
                },
                {
                    "category": "calzone",
                    "name": "mushroom calzone",
                    "description": "a delicious-a calzone",
                    "prices": [{
                            "price": 22.00,
                            "size": "largo"
                        },
                        {
                            "price": 18.00,
                            "size": "mediumoso"
                        },
                        {
                            "price": 14.00,
                            "size": "teeny tiny"
                        }
                    ],
                    "notes": "abasolutely delicious!!"
                }
            ],
            "notes": "All food items freshly prepared"
        }

## Add a customer
    POST to http://localhost:7000
    BODY: {
            "first": "Spencer",
            "last": "Jones",
            "employee_id": "123ABC",
            "company_name": "AwesomeCo",
            "phone": "123456789",
            "email": "customer@awesomeco.com",
            "address": "123 Where The Action Is Lane"
        }

    Copy response _id to be used with populating orders.
    This _id will be referred to as customer_id going forward


## To place an order for a restaurant
    POST to http://localhost:8080/orders/{restaurant_id}/customer/{customer_id}
    BODY: {
            "order_items": [
                {
                    "menu_item_id": {menu_item_id},
                    "quantity": 2,
                    "notes": "Extra cheese please"
                },
                {
                    "menu_item_id": {menu_item_id},
                    "quantity": 1
                }
            ],
            "notes": "Please deliver with utensils",
        }
## Bringing up the Node instances.
At this time, I was unable to add the NodeJS instances to the docker-compose. I wanted 
it to run via nodemon, and the examples on the web were too involved for now.  The simplest
way to run them, is to go into each folder: "customers", "hours", "menus", "orders", "restaurants",
run:
 > npm i
 > npm run dev

