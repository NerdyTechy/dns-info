var dnsInfo = require("./dns-info");

dnsInfo({
    domain: "example.com",
    server: {
        address: "8.8.8.8",
        port: 53,
        type: "udp",
    },
    timeout: 2000,
})
    .then(function (info) {
        console.log(info);
    })
    .catch(function (e) {
        console.error(e);
    });
