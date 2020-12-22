class PageChanger {
    constructor(form) {
        this.form = form
    }
    getValue(inputName) {
        return this.form.elements[inputName].value
    }

    changeText(selectorToChange, sourceInputName) {
        document.querySelector(selectorToChange).textContent = this.getValue(
            sourceInputName
        )
    }

    changeAttr(selectorToChange, attrToChange, sourceInputName) {
        const selector = document.querySelector(selectorToChange)
        if (selector.getAttribute('href').includes('mailto:')) {
            selector.setAttribute(
                attrToChange,
                `mailto:${this.getValue(sourceInputName)}`
            )
        } else {
            selector.setAttribute(attrToChange, this.getValue(sourceInputName))
        }
    }

    changeStyle(selectorToChange, styleToChange, value) {
        document.querySelector(selectorToChange).style[styleToChange] = value
    }

    changeDate(selectorToChange, sourceInputName) {
        document.querySelector(selectorToChange).textContent = this.getValue(
            sourceInputName
        )
            .split('-')
            .reverse()
            .join('.')
    }
}

const photos = {
    rink: {
        photoName: 'Skating on the Hofvijver in The Hague in 2012',
        photoAuthor: 'Marco Raaphorst',
        imageUrl:
            'https://unsplash.com/photos/y3cPNKCkGaA?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
        ccLink: 'https://www.flickr.com/photos/sloppyperfectionist/',
    },
    christmasTree: {
        photoName: 'Christmas tree',
        photoAuthor: 'Aswathy N',
        imageUrl:
            'https://images.unsplash.com/photo-1577240357860-77ad39756490?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        ccLink: 'https://unsplash.com/photos/y3cPNKCkGaA',
    },
    cup: {
        photoName: 'A cup of hot tea',
        photoAuthor: 'Aliis Sinisalu',
        imageUrl:
            'https://images.unsplash.com/photo-1456996192269-f480ebf3c86f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1043&q=80',
        ccLink: 'https://unsplash.com/photos/5S8G5_N_RpQ',
    },
    house: {
        photoName: 'A cozy house',
        photoAuthor: 'Alejandro Vasquez',
        imageUrl:
            'https://images.unsplash.com/photo-1545777683-9d7980b6540b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80',
        ccLink: 'https://unsplash.com/photos/mOvD1V1EuKA',
    },
}

function createCredit({ photoAuthor, photoName, ccLink }) {
    return `Photo: <a class="content__link" href="${ccLink}" target="_blank">${photoAuthor}</a> "${photoName}"`
}

const page = new PageChanger(document.querySelector('.form__admin'))

document.querySelector('.form__admin').addEventListener('submit', function (e) {
    e.preventDefault()
    page.changeText('.content__heading', 'heading')
    page.changeText('.content__subheading', 'subheading')
    page.changeText('.content__text', 'main-text')
    page.changeText('.content__link_type_email', 'email')
    page.changeAttr('.content__link_type_email', 'href', 'email')

    let fontFamilyToApply

    switch (page.getValue('font-family')) {
        case 'ibm':
            fontFamilyToApply = 'IBM Plex Serif'
            break
        case 'ubuntu':
            fontFamilyToApply = 'Ubuntu'
            break
        case 'istok':
            fontFamilyToApply = 'Istok Web'
            break
        default:
            fontFamilyToApply = 'IBM Plex Serif'
    }
    page.changeStyle('.content', 'font-family', fontFamilyToApply)
    page.changeStyle(
        '.content__heading',
        'font-size',
        page.getValue('heading-font-size') + 'px'
    )
    page.changeStyle(
        '.content__text',
        'font-size',
        page.getValue('text-font-size') + 'px'
    )
    page.changeDate('.content__date', 'pub-date')

    const imgOnPageToChange = document.querySelector('.content__image-item')
    const captionToChange = document.querySelector('.content__image-copyright')
    switch (page.getValue('image')) {
        case 'rink':
            imgOnPageToChange.setAttribute('src', photos.rink.imageUrl)
            imgOnPageToChange.setAttribute('alt', photos.rink.photoName)
            captionToChange.innerHTML = createCredit(photos.rink)
            break
        case 'christmasTree':
            imgOnPageToChange.setAttribute('src', photos.christmasTree.imageUrl)
            imgOnPageToChange.setAttribute(
                'alt',
                photos.christmasTree.photoName
            )
            captionToChange.innerHTML = createCredit(photos.christmasTree)
            break
        case 'cup':
            imgOnPageToChange.setAttribute('src', photos.cup.imageUrl)
            imgOnPageToChange.setAttribute('alt', photos.cup.photoName)
            captionToChange.innerHTML = createCredit(photos.cup)
            break
        case 'house':
            imgOnPageToChange.setAttribute('src', photos.house.imageUrl)
            imgOnPageToChange.setAttribute('alt', photos.house.photoName)
            captionToChange.innerHTML = createCredit(photos.house)
            break
        default:
            imgOnPageToChange.setAttribute('src', photos.rink.imageUrl)
            imgOnPageToChange.setAttribute('alt', photos.rink.photoName)
            captionToChange.innerHTML = createCredit(photos.rink)
    }
    if (page.getValue('number-of-columns') === 'one-column') {
        page.changeStyle('.content__text', 'column-count', '1')
    }
    if (page.getValue('number-of-columns') === 'two-columns') {
        page.changeStyle('.content__text', 'column-count', '2')
    }

    page.changeStyle('.content', 'color', page.getValue('text-color'))

    document
        .querySelectorAll('.content__link')
        .forEach((item) => (item.style.color = page.getValue('text-color')))

    page.changeStyle(
        '.content__text',
        'width',
        page.getValue('content-width') + '%'
    )

    if (document.querySelector('#black-background').checked) {
        page.changeStyle('.page', 'background-color', 'black')
    }

    if (document.querySelector('#bold-heading').checked) {
        page.changeStyle('.content__heading', 'font-weight', 'bold')
    } else {
        page.changeStyle('.content__heading', 'font-weight', 'normal')
    }
})

document.querySelector('.form__toggle').onclick = () => {
    document.querySelector('.form').classList.toggle('form_is-closed')
}
