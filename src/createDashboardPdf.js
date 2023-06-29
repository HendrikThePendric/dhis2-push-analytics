module.exports = async function createDashboardPdf(page, config) {
    const filePath = `artefacts/pdfs/${config.dashboardId}_${config.jobId}.pdf`
    await page.emulateMediaType('screen')
    await page.pdf({
        path: filePath,
        format: 'A4',
        printBackground: true,
        margin: {
            // Word's default A4 margins
            top: '2.54cm',
            bottom: '2.54cm',
            left: '2.54cm',
            right: '2.54cm',
        },
    })
    console.log(`Created PDF file:\t${filePath}`)
}
