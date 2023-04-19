const fake_string_pattern = "_§ds§_"

/**
 * 
 * @param { String } str 
 */
async function encode(str, pattern, fakestrings = 0, fakestring_length = 50) {
    if (typeof str != "string") return ["'str' must be a <string>"]
    if (typeof pattern != "number") return ["'pattern' must be a <number>"]
    if (typeof fakestrings != "number") return ["'fakestrings' must be a <number>"]
    const char_codes = new Array()
    let fake_str = ""

    if (fakestrings > 0) {
        for (var i = 0; i < fakestrings; i++) {
            let fstr = `${fake_string_pattern}${generateRandomString(fakestring_length)}${fake_string_pattern}`
            fake_str = fake_str + fstr
        }
    }
    str = str + fake_str
    str.split("").forEach(async c => char_codes.push(c.charCodeAt() + pattern))
    let enc_str = ""
    char_codes.forEach(c => enc_str = enc_str + String.fromCharCode(c))
    return enc_str
}

/**
 * 
 * @param { String } str 
 */
async function decode(str, pattern) {
    if (typeof str != "string") return ["'str' must be a <string>"]
    if (typeof pattern != "number") return ["'pattern' must be a <number>"]
    const char_codes = new Array()
    str.split("").forEach(async c => char_codes.push(c.charCodeAt() - pattern))
    let dec_str = ""
    char_codes.forEach(c => dec_str = dec_str + String.fromCharCode(c))
    dec_str = dec_str.replace(/(_§ds§_).*(_§ds§_)/g, "")
    return dec_str
}

/**
 * 
 * @param { File } file 
 */
function download(file) {
    const link = document.createElement('a')
    const url = URL.createObjectURL(file)

    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}

/**
 * 
 * @param {Number} length 
 * @returns 
 */
function generateRandomString(length) {
    if (typeof length != "number") return ["'length' must be a <number>"]
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

/****/

let current_encstr = ""
let current_decstr = ""

const _pattern = document.querySelector("[data-pattern]"),
    _fakestrings = document.querySelector("[data-fake_strings]"),
    _fakestrings_length = document.querySelector("[data-fake_stringlength]")

const _encode = document.querySelector("[data-encode]"),
    _copy = document.querySelector("[data-copy]"),
    _input = document.querySelector("[data-input]"),
    _results = document.querySelector("[data-results]"),
    _download = document.querySelector("[data-download]"),
    _clear = document.querySelector("[data-clear]")


_encode.addEventListener("click", async(e) => {
    const encoded_str = await encode(_input.value, !isNaN(_pattern.value) ? Number(_pattern.value) : null, !isNaN(_fakestrings.value) ? Number(_fakestrings.value) : null, !isNaN(_fakestrings_length.value) ? Number(_fakestrings_length.value) : null)
    if (encoded_str != "") {
        _results.value = encoded_str
        current_encstr = encoded_str
    } else if (typeof encoded_str == "object") {
        _results.value = `Error: ${encoded_str}`
    }
})

_copy.addEventListener("click", (e) => navigator.clipboard.writeText(current_encstr))
_download.addEventListener("click", (e) => download(new File([current_encstr], `encoded_${current_encstr.length}.txt`, { type: 'text/plain', })))
_clear.addEventListener("click", (e) => {
    current_encstr = ""
    _results.value = current_encstr
    _input.value = current_encstr
})

const _decode = document.querySelector("[data-decode]"),
    _copy_dec = document.querySelector("[data-copy_dec]"),
    _input_dec = document.querySelector("[data-input_dec]"),
    _results_dec = document.querySelector("[data-results_dec]"),
    _download_dec = document.querySelector("[data-download_dec]"),
    _pattern_dec = document.querySelector("[data-pattern_dec]"),
    _clear_dec = document.querySelector("[data-clear_dec]")

_decode.addEventListener("click", async(e) => {
    const decoded_str = await decode(_input_dec.value, !isNaN(_pattern.value) ? Number(_pattern.value) : null, !isNaN(_fakestrings.value) ? Number(_fakestrings.value) : null, !isNaN(_fakestrings_length.value) ? Number(_fakestrings_length.value) : null)
    if (decoded_str != "") {
        _results_dec.value = decoded_str
        current_decstr = decoded_str
    } else if (typeof decoded_str == "object") {
        _results_dec.value = `Error: ${decoded_str}`
    }
})

_copy_dec.addEventListener("click", (e) => navigator.clipboard.writeText(current_decstr))
_download_dec.addEventListener("click", (e) => download(new File([current_decstr], `encoded_${current_decstr.length}.txt`, { type: 'text/plain', })))
_clear_dec.addEventListener("click", (e) => {
    current_decstr = ""
    _results_dec.value = current_decstr
    _input_dec.value = current_decstr
})
