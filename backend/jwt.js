const {User } =require("./models/models"); 
const test = async () => {
    try {
        const users = await User.findAll();
        console.log("all rows",users);
    } catch (error) {
        console.error('Fehler beim Abfragen aller Benutzer:', error);
    }
}
test(); 