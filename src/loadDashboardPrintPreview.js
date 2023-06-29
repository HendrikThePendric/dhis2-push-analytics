const createClassNameContainsSelector = require('./createClassNameContainsSelector.js')
const createDataTestSelector = require('./createDataTestSelector.js')
const openPrintPreview = require('./openPrintPreview.js')
const scollElementToBottom = require('./scollElementToBottom.js')

module.exports = async function loadDashboardPrintPreview(page, config) {
    /* Some dashboard item types, like messages, do not load
     * correctly in the print preview view screen, so we need
     * to first allow all the visualisations to load and then
     * open the print preview. */
    await page.goto(config.dashboardUrl)

    await page.waitForNetworkIdle()
    // Scrolling down will force all items to be loaded
    await scollElementToBottom(
        page,
        createDataTestSelector('inner-scroll-container')
    )

    // Now we can open the preview and everything should be loaded
    // SPOILER: maps somehow are not........ But we'll just work around that in an odd way
    await openPrintPreview(page)

    // Now scroll down to print preview, which may help the maps to load?
    await scollElementToBottom(
        page,
        createClassNameContainsSelector('PrintDashboard_pageOuter')
    )
}
