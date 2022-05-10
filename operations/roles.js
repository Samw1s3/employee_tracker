const { connect } = require("../databases/connect");



async function createRoles(title,salary,departmentId){

    const connection = await connect();

    const query = `INSERT INTO \`roles\` (\`title\`,\`salary\`, \`department_id\`) VALUES ('${title}', '${salary}', '${departmentId}');`
    return connection.execute(query);


}

module.exports = {
    createRoles
}