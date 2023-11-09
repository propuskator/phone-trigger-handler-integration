jest.setTimeout(1000);
const accessSubjects = require('../mocks/accessSubjects.json');
const accessTokenReaders = require('../mocks/accessTokenReaders.json');
const HandleTrigger = require('../../../lib/services/HandleTrigger');

const handleTrigger = new HandleTrigger({ context: {} });

describe('HandleTrigger service', () => {
    test('POSITIVE: method _findIntersectionByWorkspace should return valid pairs of subject-reader with same workspace', () => {
        const pairs = handleTrigger._findIntersectionByWorkspace(accessTokenReaders, accessSubjects);

        expect(pairs.length).toBeGreaterThan(0);

        pairs.forEach(({ reader, subject }) => {
            expect(reader.workspaceId).toEqual(subject.workspaceId);
        });
    });

    test('NEGATIVE: method _findIntersectionByWorkspace should not return valid pairs because of different workspace', () => {
        expect(() => {
            handleTrigger._findIntersectionByWorkspace(accessTokenReaders, setWrongWorkspace(accessSubjects));
        }).toThrow('pair of reader and subject not found');
    });
});

function setWrongWorkspace(subjects) {
    const wrongWorkspaceId = 1231241241241234;

    return subjects.map(s => ({ ...s, workspaceId: wrongWorkspaceId }));
}
