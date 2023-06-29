const openPrintPreview = require('./openPrintPreview.js')
const scrollDownToDashboardEnd = require('./scrollDownToDashboardEnd.js')

module.exports = async function loadDashboardPrintPreview(page, config) {
    /* Some dashboard item types, like messages, do not load
     * correctly in the print preview view screen, so we need
     * to first allow all the visualisations to load and then
     * open the print preview. */
    await page.goto(config.dashboardUrl)

    await page.waitForNetworkIdle()
    // Scrolling down will force all items to be loaded
    await scrollDownToDashboardEnd(page)

    // Now we can open the preview and everything will be loaded
    openPrintPreview(page)

    // TODO: We need to wait again for the graphs to load. But HOW?

    // This seemed the most logical options but will cause an error
    // await page.waitForNetworkIdle()

    // Or maybe wait for the page navigation? This doesn't error but also doesn't help
    // page.waitForNavigation({ waitUntil: ['networkidle0', 'networkidle2'] })

    // So now I am simply waiting for 3 seconds which obviously isn't a good solution
    // but perhaps OK for a POC
    await page.waitForTimeout(3000)
}
