const db = require('../config/connection')
const inquirer = require('inquirer')

async function addRole(){
    try{
        const [department] = await db.promise().query("SELECT id, first_name, last_name FROM departments")
        const departChoices = department.map(dep => {
            return {
                name: removeEventListener.role_title,
                value: dep.id
            }
        })
        const { role_title, role_salary, department_id } = await inquirer.prompt([
            {
                type: 'input',
                name: "role_title",
                message: "Enter Role's Title:",
            },
            {
                type: 'input',
                name: "role_salary",
                message: "Enter Role's Salary:",
            },
            {
                type: 'list',
                name: "department_id",
                message: "Enter Role's Department:",
                choices: departChoices
            }
        ])
        await db.promise().query(`INSERT INTO roles (role_title, role_salary, department_id) VALUES (?, ?, ?)`, [role_title, role_salary, department_id])
        return `${first_name} ${last_name} has been added to the database`
    } catch (err) {
        console.log(`shit no work`, err)
    }
}

module.exports = addRole;