function hbsHelpers(exphbs) {
    return exphbs.create({
        helpers : {
            if : function(conditional, options) {
                if (options.hash.desired === options.hash.type) {
                    options.fn(this);
                } else {
                    options.inverse(this);
                }
            }
        }
    });
}

module.exports = hbsHelpers;