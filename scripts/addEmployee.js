const db = require('../config/connection')
const inquirer = require('inquirer')

async function addEmployee(){
    try{
        const [manager] = await db.promise().query("SELECT id, first_name, last_name FROM employees")
        const managerChoices = manager.map(man => {
            return {
                name: removeEventListener.role_title,
                value: man.id
            }
        })
        const { first_name, last_name, role_id, manager_id} = await inquirer.prompt([
            {
                name: "first_name",
                type: 'input',
                message: "enter employees first name",
            },
            {
                name: "last_name",
                type: "input",
                message: 'enter employees last name'
            },
            {
                name: "role_id",
                type: "list",
                message: 'select employee title',
                choices
            },
            {
                name: "manager_id",
                type: "list",
                message: 'select employee manager',
                choices: [...managerChoices, {name: "no manager", value:null}],
            }
        ])
        await db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id') VALUES (?, ?, ?, ?)`, [first_name, last_name, role_id, manager_id])
        return `${first_name} ${last_name} has been added to the database`
    } catch (err) {
        console.log(`shit no work`, err)
    }
}

module.exports = addEmployee;