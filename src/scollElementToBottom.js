module.exports = async function scollElementToBottom(page, scrollBoxSelector) {
    await page.waitForSelector(scrollBoxSelector)
    await page.evaluate((scrollBoxSelector) => {
        const element = document.querySelector(scrollBoxSelector)
        if (element) {
            element.scrollTop = element.offsetHeight
        } else {
            throw new Error(`cannot find selector ${scrollBoxSelector}`)
        }
    }, scrollBoxSelector)
}
