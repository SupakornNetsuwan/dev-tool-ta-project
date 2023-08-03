import { createClient } from 'ldapjs';
// 10.252.92.100
const url = "ldap://161.246.34.181";
/* LDAP filtering option */
export const base = "dc=kmitl,dc=ac,dc=th";
export const filter_fmt = "(uid=%s)"

/**
 * @description สร้าง LDAP connector instance 🔌
 */
const client = createClient({ url });

export default client;