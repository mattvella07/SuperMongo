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
        const div = database().find("div").first();
        expect(div.hasClass('database')).toEqual(true);
    });

    it('div has the text from db prop', () => {
        const div = database().find("div").first();
        expect(div.text()).toEqual(props.db);
    });

    it('on div click the class "clicked" is added to it', () => {
        const div = database().find("div").first();
        div.simulate('click');
        expect(div.hasClass('clicked')).toEqual(true);
    });
  
});