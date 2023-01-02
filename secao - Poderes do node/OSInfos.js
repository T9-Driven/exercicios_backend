const os = require('os')

const cpus = os.cpus()
const plataform = os.platform()
const arch = os.arch()

console.log(arch)