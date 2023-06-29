const createClassNameContainsSelector = require('./createClassNameContainsSelector.js')
const createDataTestSelector = require('./createDataTestSelector.js')

module.exports = async function adjustPageStyleForFileGeneration(page) {
    const printActionsBarSelector = createClassNameContainsSelector(
        'PrintActionsBar_container'
    )
    const printInfoSelector = createClassNameContainsSelector(
        'PrintInfo_container__poZzQ'
    )
    const gridLayoutSelector = '.react-grid-layout'
    const gridItemSelector = '.react-grid-item'
    const visualizationHeaderSelector = createClassNameContainsSelector(
        'ItemHeader_itemHeaderWrap'
    )
    const visualizationContainerSelector = createDataTestSelector(
        'visualization-container'
    )

    await page.waitForSelector(printActionsBarSelector)
    await page.waitForSelector(printInfoSelector)

    await page.waitForFunction(
        ({
            printActionsBarSelector,
            gridItemSelector,
            printInfoSelector,
            gridLayoutSelector,
            visualizationHeaderSelector,
            visualizationContainerSelector,
        }) => {
            const printActionBarElem = document.querySelector(
                printActionsBarSelector
            )
            const printInfoElem = document.querySelector(printInfoSelector)
            const gridLayoutEl = document.querySelector(gridLayoutSelector)

            const getOuterHeight = (el) => {
                let totalHeight = 0
                for (const childEl of el.childNodes) {
                    totalHeight +=
                        childEl.offsetHeight +
                        parseInt(
                            window
                                .getComputedStyle(childEl)
                                .getPropertyValue('margin-top')
                        ) +
                        parseInt(
                            window
                                .getComputedStyle(childEl)
                                .getPropertyValue('margin-bottom')
                        )
                }
                return totalHeight
            }

            // Hide the print action bar and instructions
            printActionBarElem.style.display = 'none'
            printInfoElem.style.display = 'none'

            // If `display` remains `flex`, then updating the height of one item
            // impacts the height of the other items and we don't want that
            gridLayoutEl.style.display = 'block'
            // Allow items to have their natural height
            gridLayoutEl.style.height = 'auto'
            // Hide scrollbar which would sometimes appear in PDF
            gridLayoutEl.style.overflow = 'hidden'

            for (const gridItemEl of document.querySelectorAll(
                gridItemSelector
            )) {
                let itemHeight = 0
                const isMessagesItem = gridItemEl.classList.contains('MESSAGES')
                const visualizationHeaderEl = gridItemEl.querySelector(
                    visualizationHeaderSelector
                )
                const iframe = gridItemEl.querySelector('iframe')
                const visualizationContainerEl =
                    iframe &&
                    iframe.contentWindow.document.querySelector(
                        visualizationContainerSelector
                    )

                if (isMessagesItem) {
                    const messagesListContainer = gridItemEl.querySelector(
                        '.dashboard-item-content'
                    )
                    const requiredHeight =
                        messagesListContainer.scrollHeight + 50

                    gridItemEl.style.height = requiredHeight + 'px'
                }

                if (visualizationContainerEl && visualizationHeaderEl) {
                    itemHeight += getOuterHeight(visualizationHeaderEl)
                }

                if (visualizationContainerEl) {
                    // Target height can be read from the childNode of the visualizationContainerEl
                    const contentHeight =
                        getOuterHeight(visualizationContainerEl) + 5
                    itemHeight += contentHeight

                    // iframe and visualization-container need to have their height adjusted to the content
                    iframe.style.height = contentHeight + 'px'
                    visualizationContainerEl.style.height = contentHeight + 'px'
                    // Grid item height needs to take into account header as well
                    gridItemEl.style.height = itemHeight + 'px'
                }
            }
            return true
        },
        {},
        {
            printActionsBarSelector,
            gridItemSelector,
            printInfoSelector,
            gridLayoutSelector,
            visualizationHeaderSelector,
            visualizationContainerSelector,
        }
    )
}
