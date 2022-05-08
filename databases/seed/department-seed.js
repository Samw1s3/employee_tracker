
const {faker} = require('@faker-js/faker');
const { createDepartment } = require('../../operations/department.js')

async function seedDepartment(num = 10){

    for (let index = 0; index < num; index++) {
        const name = faker.commerce.department();

        await createDepartment(name);
        
    }
}

module.exports = {

    seedDepartment
}