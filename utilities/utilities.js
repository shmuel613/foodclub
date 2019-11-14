const Utilities = {
    servicePorts: {
        restaurants: 3000,
        hours: 4000,
        menus: 5000,
        orders: 8080,
        customers: 7000
    },
    handleErrorResponse: (res, err) => {
        if (err) {
            res.json({
                type: err.name,
                error: err.message
            });
            return true;
        }
        return false;
    }
};

module.exports = Utilities;