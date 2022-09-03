const db = require('../config/connection');
const inquirer = require('inquirer');
const viewAllRoles = require('./viewAllRoles');

async function delRole() {
    try {
        const allRoles = await viewAllRoles();
        const { role_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'role_id',
                message: 'select which role to delete',
                choices: allRoles[0].map((r) => ({
                    name: r.role_title,
                    value: r.role_id,
                }))
            }
        ])
        const delRole = await db.promise().query(`DELETE FROM roles WHERE role_id = ${role_id}`);
        return `role deleted`;
    } catch (err) {
        console.log(`stuff broke`, err)
    }
}

module.exports = delRole