const puppeteer = require('puppeteer')
const adjustPageStyleForFileGeneration = require('./adjustPageStyleForFileGeneration.js')
const createDashboardItemScreenshots = require('./createDashboardItemScreenshots.js')
const createDashboardPdf = require('./createDashboardPdf.js')
const loadDashboardPrintPreview = require('./loadDashboardPrintPreview.js')
const login = require('./login.js')
const parseInputVariables = require('./parseInputVariables.js')

async function init() {
    console.time('duration')

    const browser = await puppeteer.launch({
        // headless: 'new',
        headless: false,
        devtools: true,
        defaultViewport: { width: 1280, height: 1000 },
        args: ['--window-size=2560,2160', '--window-position=4000,0'],
    })
    const page = await browser.newPage()

    const config = parseInputVariables()

    await login(page, config)
    await loadDashboardPrintPreview(page, config)
    // This is far from perfect but investing too much time here seems pointless
    await adjustPageStyleForFileGeneration(page)
    await createDashboardItemScreenshots(page, config)
    // There is an issue with the maps not loading in the print preview
    // Because of this the PDF will contain a lot of images of spinners
    // if the dashboard contains a lot of maps
    await createDashboardPdf(page, config)

    // await browser.close()

    console.timeEnd('duration')
}

init()
