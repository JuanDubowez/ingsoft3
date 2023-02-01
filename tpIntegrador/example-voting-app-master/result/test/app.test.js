const getPercentages = require('../views/getPercentages');
const collectVotesFromResult = require('../views/voteCollector');

describe('test result service', () => {
    test(': get porcentages ', () => {
        const { a, b } = getPercentages(3, 4);
        expect(a).toEqual(43);
        expect(b).toEqual((57));
    });
    it(': vote only for "a"', (done) => {
        let res = collectVotesFromResult({
            rows: [
                {
                    vote: 'a',
                    count: '3'
                }
            ]
        });
        expect(res.a).toEqual(3);
        expect(res.b).toEqual(0);
        done();

    });


    it(': vote only for "b"', (done) => {
        var res = collectVotesFromResult({
            rows: [
                {
                    vote: 'b',
                    count: '3'
                }
            ]
        });
        expect(res.a).toEqual(0);
        expect(res.b).toEqual(3);
        done();

    });

    it(': no vote', (done) => {
        var res = collectVotesFromResult({
            rows: [ ]
        });
        expect(res.a).toEqual(0);
        expect(res.b).toEqual(0);
        done();

    });

    it(': vote with different properties', (done) => {
        var res = collectVotesFromResult({
            rows: [
                {
                    vote: 'C',
                    count: '3'
                }
            ]
        });
        expect(res.a).toEqual(0);
        expect(res.b).toEqual(0);
        done();

    });

    it(': vote to two parties', (done) => {
        var res = collectVotesFromResult({
            rows: [
                {
                    vote: 'a',
                    count: '2'
                },
                {
                    vote: 'b',
                    count: '2'
                }
            ]
        });
        expect(res.a).toEqual(2);
        expect(res.b).toEqual(2);
        done();

    });
});