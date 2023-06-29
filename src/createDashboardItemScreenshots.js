module.exports = async function createDashboardItemScreenshots(page, config) {
    let fileNumber = 0
    const items = await page.$$('.react-grid-item:not(.PAGEBREAK)')

    for (const item of items) {
        // const isMapsItem =
        fileNumber++
        const filePath = `artefacts/images/${config.dashboardId}_${config.jobId}_${fileNumber}.png`
        await item.screenshot({
            path: filePath,
        })
        console.log(`Created image:\t\t${filePath}`)
    }
}
