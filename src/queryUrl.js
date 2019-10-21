const BASE = '';
let selectUrl = (key) => `${BASE}/sample/select?key=${key}`;
let detailUrl = (key) => `${BASE}accurate/select?key=${key}`;

export {
    selectUrl,
    detailUrl
}
