const db = require('../config/connection');

async function viewAllRoles() {
    try {
        const allRoles = await db.promise().query('SELECT * FROM roles')
        return allRoles
    } catch (err) {
        console.log(`stuff broke`, err)
    }
}

module.exports = viewAllRoles;