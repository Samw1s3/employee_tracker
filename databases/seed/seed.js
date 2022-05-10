



//create 10 departments

const { seedDepartment } = require("./department-seed");
const { seedRoles } = require("./role-seed")

async function seed() {
    // seed department
    await seedDepartment(10);
    // seed roles
    // await seedRoles(10);
    // seed employee
}

seed();