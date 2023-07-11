/**
 * 
 * @param {String} string String to translate.
 * @param {String} language Language to translate to.
 */

module.exports = async function translate(string, language) {
    if (!string) return console.log("Translator: No Strings Provided!")
    if (!language) return console.log("Translator: No Language Provided!")

    if (language === "en") return string; // the string will always be given in english so give the same text back

    if (language === "zh") language = "zh-CN";
    if (language === "zhcn" || language === "zh-cn") language = "zh-CN";
    if (language === "zhtw" || language === "zh-tw") language = "zh-TW";
    const { translate } = require('@vitalets/google-translate-api');

    let translation = await translate(string, { to: language }).catch(e => console.log(e));
    return translation.text;
}