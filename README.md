# dns-info

A simple package to fetch information about a domain's DNS records.

> :warning: **Note:** This package is a fork of [pihvi/dns-info](https://www.npmjs.com/package/dns-info) and has been updated to fix security vulnerabilities and to simplify the codebase.

## Installation
```
npm install @nerdytechy/dns-info
```

This fork of dns-info supports both CommonJS and ESM.

### CommonJS
```javascript
const dnsInfo = require("@NerdyTechy/dns-info");
```

### ESM
```javascript
import dnsInfo from '@nerdytechy/dns-info';
```

## Examples

### Simple Request

```javascript
dnsInfo("example.com").then((info) => {
    console.log(info);
});
```

### Custom Options

```javascript
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
        console.error(e); // Request timed out
    });
```

### Filtering Records

```javascript
dnsInfo("example.com").then((info) => {
    console.log(info.records.find((records) => records.type === "A").data);
});
```
