const { connect } = require("../databases/connect");



async function createDepartment(name){

    const connection = await connect();

    const query = `INSERT INTO \`departments\` (\`name\`) VALUES ('${name}');`
    return connection.execute(query);


}

module.exports = {
    createDepartment
}