const db = require('../config/connection');
const inquirer = require("inquirer");
const viewAllDepartments = require('./viewAllDepartments');

async function viewDepartSalary(){
    try{
        const allDepartments = await viewAllDepartments();
        const {deparment_id} = await inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: 'select department total salary',
                choices: allDepartments[0].map((d) => ({
                    name: d.department_name,
                    value: d.department_id,
                })),
            }
        ]);
        const departSalary = await db.promise().query(`SELECT SUM(role_salary) AS total_salary FROM roles WHERE department_id = ${deparment_id}`);
        return departSalary;
    }catch (err){
        console.log(`broke`, err)
    }
}

module.exports = viewDepartSalary