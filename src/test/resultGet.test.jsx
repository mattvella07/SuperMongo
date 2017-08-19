import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import ResultGet from './../components/resultGet.jsx';

describe('ResultGet', () => {
    let props,
        mountedResultGet;

    beforeEach(() => {
        props = {
            db: 'testDB',
            col: 'testCollection',
            query: '{}',
            projection: '{}',
            options: '{}',
            findOp: 'find',
            distinctKey: 'testKey'
        };
        mountedResultGet = undefined;
    });

    const resultGet = () => {
        if(!mountedResultGet) {
            mountedResultGet = mount(
                <ResultGet {...props} />
            );
        }

        return mountedResultGet;
    }

    it('sets props correctly', () => {
        expect(resultGet().props().db).toEqual('testDB');
        expect(resultGet().props().col).toEqual('testCollection');
        expect(resultGet().props().query).toEqual('{}');
        expect(resultGet().props().projection).toEqual('{}');
        expect(resultGet().props().options).toEqual('{}');
        expect(resultGet().props().findOp).toEqual('find');
        expect(resultGet().props().distinctKey).toEqual('testKey');
    });

    it('returns a div', () => {
        let div = resultGet().find("div");
        expect(div.length).toBeGreaterThan(0);
    });

    it('div has the class resultArea', () => {
        let div = resultGet().find("div").first();
        expect(div.hasClass('resultArea')).toEqual(true);
    });
});