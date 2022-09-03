const db = require('../config/connection');
const inquirer = require('inquirer');
const viewAllDepartments = require('./viewAllDepartments');

async function delDepartment() {
    try {
        const allDepartments = await viewAllDepartments();
        const { department_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: 'Select Department To Delete:',
                choices: allDepartments[0].map((d) => ({
                    name: d.department_name,
                    value: d.department_id,
                })),
            }
        ]);
        const delDep = await db.promise().query(`DELETE FROM departments WHERE department_id = ${department_id}`);
        return `Department deleted`;
    } catch (err) {
        console.log(`stuff broke`, err)
    }
}

module.exports = delDepartment;