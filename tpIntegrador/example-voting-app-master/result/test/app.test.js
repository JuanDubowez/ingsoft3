const getPercentages = require('../views/getPercentages');
describe('test result service', () =>{
    test(': try get porcentages ',() => {
        const {a,b} = getPercentages(3,4);
            expect(a).toEqual(43);
            expect(b).toEqual((57));
    });
}); 