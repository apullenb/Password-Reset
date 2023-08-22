

const createToken = (email, id, name) => {
    let alpha = ['a', 'd', 'r', 'f', 'e', 'x', 'q', 'v', 'n', 't', 'z', 'p', 'w', 'y', 'c', 'b', 'm']
    let s = email.length - 6
    let a = Math.floor(Math.random() * 15 )
    let q = Math.floor(Math.random() * 10 + 3 )
    let f = Math.floor(Math.random() * 5 * email.length * 18 * id * Math.random())  
    let x = Math.floor(Math.random() * 3 * name.length * 6 * id * Math.random())
    let y = email[s] + alpha[a] + email[0]
    let z = name.length * Math.floor(Math.random() * 41 + 4)
    let l = name[0] + alpha[a] + alpha[s]
    let token = x + s + '-' + y + (id + q) + alpha[a] + alpha[q] + '-' + f + '-' + l + z 
    return token.trim()
    }
    

    module.exports = createToken