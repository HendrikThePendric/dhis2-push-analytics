// TODO: this probably is a security issue
module.exports = async function login(page, { loginUrl, username, password }) {
    await page.goto(loginUrl)
    await page.type('#j_username', username)
    await page.type('#j_password', password)
    await page.click('#submit')
}
