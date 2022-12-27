var dns = require("native-dns");
var Promise = require("bluebird");
var _ = require("lodash");

const defaults = {
    server: {
        address: "8.8.8.8",
        port: 53,
        type: "udp",
    },
    timeout: 2000,
};

module.exports = function fetchDnsInfo(param) {
    var config = parseConfig(param, defaults);
    var allTypes = Object.keys(dns.consts.NAME_TO_QTYPE).map(function (type) {
        return new Promise(function (resolve, reject) {
            dns.Request({
                question: dns.Question({
                    name: config.domain,
                    type: type,
                }),
                server: config.server,
                timeout: config.timeout,
            })
                .on("timeout", function () {
                    reject("Timeout in fetching DNS info.");
                })
                .on("message", function (err, res) {
                    resolve(err || res);
                })
                .send();
        });
    });
    return Promise.reduce(
        allTypes,
        function (result, response) {
            if (response.answer.length) {
                var questionType = dns.consts.QTYPE_TO_NAME[response.question[0].type];
                var data = response.answer.map(function (entry) {
                    return _(entry).omit("type", "name", "class").value();
                });
                result.records.push({ type: questionType, data: data });
            }
            return result;
        },
        { domain: config.domain, records: [] }
    );
};

function parseConfig(param, defaults) {
    if (typeof param === "string") {
        return _.assign({}, defaults, { domain: param });
    } else {
        return _.assign({}, defaults, param);
    }
}
