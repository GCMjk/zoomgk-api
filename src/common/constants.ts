export enum RabbitMQ {
    UserQueue = 'users',
    SubscriptionQueue = 'subscriptions',
    EventQueue = 'events',
    UploadFileQueue = 'upload-files'
}

export enum UserMSG {
    CREATE = 'CREATE_USER',
    FIND_ALL = 'FIND_USERS',
    FIND_ONE = 'FIND_USER',
    UPDATE = 'UPDATE_USER',
    UPLOAD_AVATAR = 'UPLOAD_AVATAR',
    DELETE = 'DELETE_USER',
    CONFIRMED = 'CONFIRMED',
    VALID_USER = 'VALID_USER',
    ASSIGNED_SUB = 'ASSIGNED_SUB'
}

export enum SubscriptionMSG {
    CREATE = 'CREATE_SUBSCRIPTION',
    FIND_ALL = 'FIND_SUBSCRIPTIONS',
    FIND_ONE = 'FIND_SUBSCRIPTION',
    UPDATE = 'UPDATE_SUBSCRIPTION',
    DELETE = 'DELETE_SUBSCRIPTION'
}

export enum EventMSG {
    CREATE = 'CREATE_EVENT',
    FIND_ALL = 'FIND_EVENTS',
    FIND_ONE = 'FIND_EVENT',
    UPDATE = 'UPDATE_EVENT',
    DELETE = 'DELETE_EVENT',
    ADD_GUEST = 'ADD_GUEST'
}

export enum UploadFileMSG {
    UPLOAD = 'UPLOAD',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}