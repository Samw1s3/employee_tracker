



//create 10 departments

const { seedDepartment } = require("./department-seed");


async function seed() {
    // seed department
    await seedDepartment(10);
    // seed roles

    // seed employee
}

seed();