const loginPath = 'dhis-web-commons/security/login.action'
const dashboardsAppPath = 'dhis-web-dashboard/#'
const apiPath = 'api'

module.exports = function parseInputVariables() {
    const baseUrl = process.env.npm_config_base_url
    const dashboardId = process.env.npm_config_dashboard_id
    /* TODO: We need to be able to produce multiple exports
     * for a single dashboard so quite likely we need to receive
     * a (scheduler) job ID to differentiate. For now we just
     * use a timestamp */
    const jobId = Date.now()
    const username = process.env.npm_config_username
    const password = process.env.npm_config_password

    const loginUrl = `${baseUrl}/${loginPath}`
    const dashboardUrl = `${baseUrl}/${dashboardsAppPath}/${dashboardId}`
    const apiUrl = `${baseUrl}/${apiPath}`

    const allPresent = baseUrl && dashboardId && username && password

    if (!allPresent) {
        throw new Error('Some variables are missing')
    }

    return {
        apiUrl,
        dashboardId,
        jobId,
        dashboardUrl,
        loginUrl,
        password,
        username,
    }
}
