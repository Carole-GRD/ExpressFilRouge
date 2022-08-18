class UserDTO { 
    id;
    email;
    pseudo;
    firstname;
    lastname;
    role;

    constructor (id, email, pseudo, firstname, lastname, role) {
        this.id = id;
        this.email = email;
        this.pseudo = pseudo;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
    }
}



module.exports = UserDTO;



