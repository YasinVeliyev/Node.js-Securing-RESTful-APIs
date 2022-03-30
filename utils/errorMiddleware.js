exports.catchAsync = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            console.error(err);
            res.status(400).json({ err });
        });
    };
};
