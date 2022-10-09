const bcrypt = require("bcrypt");

(async () => {
    //For hashing passwords
    const salt = await bcrypt.genSalt(15);
    console.log(await bcrypt.hash("1234", salt));
})();