const db = require('../config/connection');

async function viewAllDepartments() {
    try {
        const allDepartments = await db.promise().query('SELECT * FROM departments')
        return allDepartments
    } catch (err) {
        console.log(`broke`, err)
    }
}

module.exports = viewAllDepartments;