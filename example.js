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
    .then((info) => {
        console.log(info);
    })
    .catch((e) => {
        console.error(e);
    });
