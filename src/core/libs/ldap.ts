import LdapAuth from 'ldapauth-fork'

const ldapAuth = new LdapAuth({
    url: 'ldap://10.252.92.100',
    searchBase: 'DC=kmitl,DC=ac,DC=th',
    searchFilter: '(mail={{username}})',
    reconnect: true
});

const getUser = async (username: string, password: string) => {
    try {

        ldapAuth.authenticate(username, password, (err, user) => {
            if (err) throw err;
            console.log(user);
        })

        ldapAuth.close()
    } catch (error) {
        console.log(error);
    }
}


export default getUser