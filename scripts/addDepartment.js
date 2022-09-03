const db = require('../config/connection');
const inquirer = require('inquirer');

async function addDepartment() {
    try {
        const { department_name } = await inquirer.prompt([
            {
                type: 'input',
                name: "department_name",
                message: "Enter Department Name:",
            },
        ])
        console.log(department_name)
        await db.promise().query(`INSERT INTO departments (department_name) VALUES (?)`, [department_name])
        return `${department_name} has been added to the database`
    } catch (err) {
        console.log(`Error:`, err)
    }
}

module.exports = addDepartment;

