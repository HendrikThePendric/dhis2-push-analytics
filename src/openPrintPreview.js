module.exports = async function openPrintPreview(page) {
    const moreButton = await page.waitForSelector('button ::-p-text(More)')
    await moreButton.click()
    const printSubMenuOpener = await page.waitForSelector('a ::-p-text(Print)')
    await printSubMenuOpener.click()
    const printOneItemPerPageLink = await page.waitForSelector(
        'a ::-p-text(One item per page)'
    )
    await printOneItemPerPageLink.click()
}
