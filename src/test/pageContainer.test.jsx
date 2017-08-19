import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import PageContainer from './../components/pageContainer.jsx';

describe('PageContainer', () => {
    let props,
        mountedPageContainer;

    beforeEach(() => {
        props = {
            allDBsApi: 'http://localhost:3000/api/databases'
        };
        mountedPageContainer = undefined;
    });

    const pageContainer = () => {
        if(!mountedPageContainer) {
            mountedPageContainer = mount(
                <PageContainer {...props} />
            );
        }

        return mountedPageContainer;
    }

    it('sets props correctly', () => {
        expect(pageContainer().props().allDBsApi).toEqual('http://localhost:3000/api/databases');
    });

    it('returns a div', () => {
        let div = pageContainer().find("div");
        expect(div.length).toBeGreaterThan(0);
    });

    it('div has class pageContainer', () => {
        let div = pageContainer().find("div").first();
        expect(div.hasClass('pageContainer')).toEqual(true);
    });

    it('div has 2 children', () => {
        let div = pageContainer().find("div").first();
        expect(div.children().length).toEqual(2);
    });

    it('first inner div has the classes column and sideBar', () => {
        let div = pageContainer().find("div").first();
        let innerDiv1 = div.children().first();
        expect(innerDiv1.hasClass('column')).toEqual(true);
        expect(innerDiv1.hasClass('sideBar')).toEqual(true);
    });

    it('last inner div has the classes column and mainContainer', () => {
        let div = pageContainer().find("div").first();
        let innerDiv2 = div.children().last();
        expect(innerDiv2.hasClass('column')).toEqual(true);
        expect(innerDiv2.hasClass('mainContainer')).toEqual(true);
    });
});