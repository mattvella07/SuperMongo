import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import DatabaseList from './../components/databaseList.jsx';

describe('DatabaseList', () => {
    let props,
        mountedDatabaseList;

    beforeEach(() => {
        props = {
            source: 'http://localhost:3000/api/databases',
            onDBClick: function() {}
        };
        mountedDatabaseList = undefined;
    });

    const databaseList = () => {
        if(!mountedDatabaseList) {
            mountedDatabaseList = mount(
                <DatabaseList {...props} />
            ); 
        }

        return mountedDatabaseList;
    }

    it('sets props correctly', () => {
        expect(databaseList().props().source).toEqual('http://localhost:3000/api/databases');
        expect(databaseList().props().onDBClick).toBeA('function');
    });

    it("returns a div", () => {
        const divs = databaseList().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("div has the class databaseList", () => {
        const div = databaseList().find("div").first();
        expect(div.hasClass('databaseList')).toEqual(true);
    });

    it("displays an H3 element", () => {
        const div = databaseList().find("div").first();
        const header = div.find("h3");
        expect(header.length).toBeGreaterThan(0);
    });

    it("H3 element has the text 'DATABASES'", () => {
        const div = databaseList().find("div").first();
        const header = div.find("h3").first();
        expect(header.text()).toEqual('DATABASES');
    });
});