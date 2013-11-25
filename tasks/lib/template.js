module.exports = {
    hashToTemplate: function (contents, hashMap) {
        if (contents && hashMap) {
            return contents.replace(/{{.*?}}/g, function (match) {
                return hashMap[match.replace(/{{|}}/g, "")];
            });
        } else {
            throw new Error("You must pass contents and a parameter map to compile a template in grunt-api-doc.");
        }
    }
};