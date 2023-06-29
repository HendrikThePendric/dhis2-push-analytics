const createDataTestSelector = require('./createDataTestSelector.js')

module.exports = async function scrollDownToDashboardEnd(page) {
    const scrollableDivSelector = createDataTestSelector(
        'inner-scroll-container'
    )
    await page.waitForSelector(scrollableDivSelector)
    await page.evaluate((scrollableDivSelector) => {
        const element = document.querySelector(scrollableDivSelector)
        if (element) {
            element.scrollTop = element.offsetHeight
        } else {
            throw new Error(`cannot find selector ${scrollableDivSelector}`)
        }
    }, scrollableDivSelector)
}
