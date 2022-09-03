const db = require('../config/connection');
const inquirer = require('inquirer');

async function updateEmployee() {
    try {
        const [employee] = await db.promise().query("SELECT id, first_name, last_name FROM employees")
        const employeeChoices = employee.map(emp => {
            return {
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id
            }
        })
        const [roles] = await db.promise().query(`SELECT role_id, role_title FROM roles`)
        const choices = roles.map(role => {
            return {
                name: role.role_title,
                value: role.role_id
            }
        })

        const { employee_id, role_id } = await inquirer.prompt([
            {
                name: "employee_id",
                type: 'list',
                message: "Select Employee To Update:",
                choices: employeeChoices
            },

            {
                name: "role_id",
                message: "Select Employee's Title:",
                type: "list",
                choices
            }
        ])
        await db.promise().query(`UPDATE employees SET ? WHERE ?`, [{ role_id }, { id: employee_id }])
        return `employee updated`
    } catch (err) {
        console.log(`broke`, err)
    }
}

module.exports = updateEmployee;
