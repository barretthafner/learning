var React = require('react');
var ReactDOM = require('react-dom');

var SoundCloudEmbed = function(props) {
    var playerUrl = 'https://w.soundcloud.com/player/';
    var trackUrl = 'https://api.soundcloud.com/tracks/' + props.trackId;
    var options = 'auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true';
    var src = playerUrl + '?url=' + trackUrl + '&' + options;
    return <iframe width="100%" height="450" scrolling="no" frameborder="no" src={src}></iframe>;
};

var Button = function(props) {
    return <button onClick={props.onClick}>{props.text}</button>;
};

var Surprise = React.createClass({
    getInitialState: function() {
        return {
            clicked: false
        };
    },
    onButtonClick: function() {
        this.setState({
            clicked: true
        });
    },
    render: function() {
        return (
            <div>
                <Button onClick={this.onButtonClick} text="Ready to be amazed?" />
                {this.state.clicked ? <SoundCloudEmbed trackId="191075550" /> : null}
            </div>
        );
    }
});

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<Surprise />, document.getElementById('app'));
});
