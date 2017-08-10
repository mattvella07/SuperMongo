import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import Database from './../components/database.jsx';

global.window = window
global.$ = require('jquery');

describe('Database', () => {
    let props, 
        mountedDatabase;

    beforeEach(() => {
        props = {
            db: 'testDB',
            onDBClick: function() {}
        };
        mountedDatabase = undefined;
    });

    const database = () => {
        if(!mountedDatabase) {
            mountedDatabase = mount(
                <Database {...props} />
            );
        }

        return mountedDatabase;
    }

    it('sets props correctly', () => {
        expect(database().props().db).toEqual('testDB');
        expect(database().props().onDBClick).toBeA('function');
    });

    it('returns a div', () => {
        const divs = database().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it('div has the class database', () => {
        const divs = database().find("div");
        expect(divs.hasClass('database')).toEqual(true);
    });

    it('div has the text from db prop', () => {
        const divs = database().find("div");
        expect(divs.text()).toEqual(props.db);
    });

    it('on div click the class "clicked" is added to it', () => {
        const divs = database().find("div");
        divs.simulate('click');
        expect(divs.hasClass('clicked')).toEqual(true);
    });
  
});