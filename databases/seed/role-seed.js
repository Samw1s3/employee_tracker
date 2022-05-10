const {faker} = require('@faker-js/faker');

const { createRoles } = require('../../operations/roles.js')


async function seedRoles(num = 10){

    for (let index = 0; index < num; index++) {
        const title = faker.person.title();
        console.log(`${title}`);
        const salary = random_between(30000, 110000);
        console.log(`${salary}`);
        const departmentId = random_between(1, 11) in [1,2,3, 4, 5, 6, 7,8,9,10]
        true
        
        await seedRoles
    }
}

module.exports = {
    seedRoles
}