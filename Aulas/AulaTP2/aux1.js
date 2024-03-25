//Data 
exports.myDateTime = () => {
    var d = new Date().toISOString().substring(0,16)
    return d
}
//Nome
exports.myName = () => {
    return "João Rodrigues"
}
//Turma
exports.turma = "EngWeb2024 :: TP3"