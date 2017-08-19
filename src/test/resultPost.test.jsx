import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import ResultPost from './../components/resultPost.jsx';

describe('ResultPost', () => {
    let props,
        mountedResultPost;

    beforeEach(() => {
        props = {
            db: 'testDB',
            col: 'testCollection', 
            dataObj: '{}',
            op: 'update',
            criteria: '{}',
            justOne: '{}',
            options: '{}'
        };
        mountedResultPost = undefined;
    });

    const resultPost = () => {
        if(!mountedResultPost) {
            mountedResultPost = mount(
                <ResultPost {...props} />
            );
        }

        return mountedResultPost;
    }

    it('sets props correctly', () => {
        expect(resultPost().props().db).toEqual('testDB');
        expect(resultPost().props().col).toEqual('testCollection');
        expect(resultPost().props().dataObj).toEqual('{}');
        expect(resultPost().props().op).toEqual('update');
        expect(resultPost().props().criteria).toEqual('{}');
        expect(resultPost().props().justOne).toEqual('{}');
        expect(resultPost().props().options).toEqual('{}');
    });

    it('returns a div', () => {
        let div = resultPost().find("div");
        expect(div.length).toBeGreaterThan(0);
    });

    it('div has the class resultArea', () => {
        let div = resultPost().find("div").first();
        expect(div.hasClass('resultArea')).toEqual(true);
    });
});