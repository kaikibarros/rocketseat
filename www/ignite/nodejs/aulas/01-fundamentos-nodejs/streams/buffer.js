// buffer é uma representação de um espaço na memoria do pc, usado para transitar dados de forma veloz
// é do próprio node
// é mt mais rápido ler os dados de forma binário do que uma String ou qqrl outra forma.
// JS não trabalha tão bem com dados binários, por isso usamos o buffer

//0123456789AABCDEF
const buf = Buffer.from("kako")
console.log(buf.toJSON())