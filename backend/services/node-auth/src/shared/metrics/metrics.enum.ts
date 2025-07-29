export enum MetricAction {
    Create = 'create',
    Login = 'login'
}

export enum MetricType {
    Success = 'success',
    Fail = 'fail'
}

export enum MetricMethod {
    Get = 'get',
    Post = 'post',
    Delete = 'delete',
    Put = 'put',
    Patch = 'patch'
}

export enum MetricReason {
    AccountNotFound = 'account_not_found',
    InvalidCredentials = 'invalid_credentials',
    EmailInUse = 'email_already_in_use',
    AccountCreated = 'account_created',
    LoginSuccess = 'login_success'
}