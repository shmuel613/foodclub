const Utilities = {
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