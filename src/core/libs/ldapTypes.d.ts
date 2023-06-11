export type LDAPuser = {
    messageId: number;
    protocolOp: number;
    type: string;
    objectName: string;
    attributes: LDAPuserAttribute[];
    controls: any[];
}

export type LDAPuserAttribute = {
    type: string;
    values: string[];
}

export type FindUserType = (username: string, password: string) => Promise<{
    LDAPuser: LDAPuser;
    LDAPerror: null;
} | {
    LDAPuser: null;
    LDAPerror: Error;
}>