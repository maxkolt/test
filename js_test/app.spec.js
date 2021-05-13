const multiply = require('./app');


defaultStatus('testing app.js_test', () => {
    it('проверяем что 2 * 2 равно 4', () => {
        expect(multiply(2, 2)).toBe(4);
    })
})