const db = require('../config/connection');
const inquirer = require('inquirer');
const viewAllEmployees = require('./viewAllEmployees');


async function delEmployee() {
    try {
        const allEmployees = await viewAllEmployees();
        const { employee_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Select Employee To Delete:',
                choices: allEmployees[0].map((e) => ({
                    name: `${e.first_name} ${e.last_name}`,
                    value: e.id,
                })),
            }
        ]);
        const delEmp = await db.promise().query(`DELETE FROM employees WHERE id = ${employee_id}`);
        return `Employee deleted`;
    } catch (err) {
        console.log(`stuff broke`, err)
    }
}

module.exports = delEmployee;