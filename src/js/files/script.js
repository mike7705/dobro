// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
/*
let mobileSearch = document.querySelector(".icon-search")
if (mobileSearch) {
    mobileSearch.addEventListener("click", function (e) {
        let search = e.target.closest('.search')
        if (search) {
            search.classList.toggle("_mobile-search");
        }
    });
};
*/

let agreeButtons = document.querySelectorAll('input[name="agree"]');
//console.log(agreeButtons)
if (agreeButtons.length > 0) {
    agreeButtons.forEach(function (element) {
        element.addEventListener("click", function (e) {
            //e.preventDefault()
            let agree = e.target
            //console.log(agree.checked)
            //console.log(e)
            let el = agree.nextElementSibling
            while (el) {
                //console.log(el.nodeName);
                if (el.classList.contains("submit") && el.nodeName == "BUTTON") {
                    el.classList.toggle("disabled", !(agree.checked))
                    break
                }
                el = el.nextElementSibling;
            }
        })
    })
}
//! disable SUBMIT AND AGREEMENT */
document.addEventListener("beforePopupOpen", function (e) {
    // Попап
    const currentPopup = document.querySelector(e.detail.popup.hash);
    //console.log(currentPopup)
    if (currentPopup) {
        let form = currentPopup.querySelector(".form")
        if (form) {
            let submit = form.querySelector('button[type="submit"]')
            let agree = form.querySelector('input[name="agree"]')
            if (submit && agree) {
                if (!(submit.classList.contains("disabled"))) submit.classList.add("disabled");
                agree.checked = false;
            }
        }
    }

});
let parents = document.querySelectorAll('.parent__row');
if (parents.length > 0) {
    parents.forEach(function (element) {
        element.addEventListener("click", function (e) {

            alert('a')
            e.stopPropagation()
            let agree = e.target
            console.log(document.location.origin)
            console.log(agree.getAttribute('href'))
            document.location.href = document.location.origin + agree.getAttribute('href')
            // e.preventDefault()
        })
    })
}
const openedParents = document.querySelectorAll('.spollers__item.parent.active');
if (openedParents.length > 0) {
    openedParents.forEach(function (el) {
        console.log(el)
        let sp = el.childNodes //el.closest("[data-spoller]")
        for (let i = 0; i < sp.length; i++) {
            const element = sp[i];
            if ((element.nodeName == "BUTTON") && (element.classList.contains("spollers__title"))) {
                console.log(element)
                //setSpollerAction(element)
                element.classList.toggle("_spoller-active", !(element.classList.contains("_spoller-active")))
                break
            }
        }
    })
}
$(document).on('change', '#filters input', function () {
    if (typeof (pdoPage) == 'undefined') return;

    var fields = {};
    $.each($('#filters').serializeArray(), function () {
        if (this.name.indexOf('[]') <= 0) {
            fields[this.name] = this.value;
        } else {
            // Для чекбоксов посложнее
            var name = this.name.replace('[]', '');
            if (typeof (fields[name]) == 'undefined') {
                fields[name] = [];
            }
            fields[name].push(this.value);
        }
    });
    $.post(document.location.href, {
        action: 'filter',
        fields: fields,
        hash: pdoPage.configs.page.hash
    }, function (data) {
        var tmp = document.location.href.split('?');
        pdoPage.keys.page = 0;
        pdoPage.loadPage(tmp[0], pdoPage.configs.page);
    });
});