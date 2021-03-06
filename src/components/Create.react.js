/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var $ = require('jquery');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var UserStore = require('../stores/UserStore');
var Config = require('../constants/Config');

var moment = require('moment');

var Create = React.createClass({

    onClickCreate: function (e) {
        e.preventDefault();

        var data = {
            eventName: this.refs.name.getValue(),
            totalAmount: this.refs.totalAmount.getValue(),
            currency: "EUR",
            recipientRippleAccountId: UserStore.getUser().rippleAccount,
            recipientUserName: UserStore.getUser().name
        };
        let url = Config.serverOptions.url + ':' + Config.serverOptions.port + '/event';
        $.post(url, data, function (data, status) {
            var eventCode = data.eventCode;
            this.context.router.transitionTo('show', {eventCode: eventCode});
        }.bind(this));
    },

    onClickNameField: function() {
        var inputField = React.findDOMNode(this.refs.name).getElementsByTagName('input')[0];
        inputField.setSelectionRange(0, inputField.value.length);
        return true;
    },

    render: function () {
        return (
            <form onSubmit={this.onClickCreate}>
                <TextField
                    floatingLabelText="Event Name"
                    ref="name"
                    defaultValue={'Event_from_'+moment().format('YY-MM-DD HH:mm')}
                    onClick={this.onClickNameField}
                    />
                <br/>
                <TextField
                    ref="totalAmount"
                    hintText="0.00"
                    floatingLabelText = "EUR"
                    type="number"
                    step="0.01"/>
                <br/>
                <br/>
                <RaisedButton type="submit" label="Create" primary={true}/>
            </form>
        );
    }
});

Create.contextTypes = {
    router: React.PropTypes.func
};

module.exports = Create;
