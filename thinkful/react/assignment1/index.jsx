var React = require('react');
var ReactDOM = require('react-dom');

//var Person = function() {
//    var name = 'Chad Zoolander';
//    var imageUrl = 'http://uifaces.com/assets/static/images/zoolander.jpg';
//    var job = 'Male model';
//    return (
//        <div className="person">
//            <div className="person-name">{name}</div>
//            <img className="person-img" src={imageUrl} />
//            <div className="person-job">
//                {job}
//            </div>
//        </div>
//    );
//};

//var PersonList = function() {
//    return (
//        <div className="person-list">
//            <Person />
//            <Person />
//            <Person />
//            <Person />
//            <Person />
//        </div>
//    );
//};

//var PersonList = function() {
//    var people = [];
//    for (var i=0; i<5; i++) {
//        people.push(<Person />);
//    }
//    return (
//        <div className="person-list">
//            {people}
//        </div>
//    );
//};

//var PersonList = React.createClass({
//    render: function() {
//        var people = [];
//        for (var i=0; i<5; i++) {
//            people.push(<Person />);
//        }
//        return (
//            <div className="person-list">
//                {people}
//            </div>
//        );
//    }
//});

//var Person = function(props) {
//    return (
//        <div className="person">
//            <div className="person-name">{props.name}</div>
//            <img className="person-img" src={props.imageUrl} />
//            <div className="person-job">
//                {props.job}
//            </div>
//        </div>
//    );
//};

var Person = React.createClass({
    getInitialState: function() {
        return {
            highlight: false
        };
    },
    onClick: function() {
        this.setState({
            highlight: !this.state.highlight
        });
    },
    render: function() {
        console.log(this);
        var classes = 'person ' + (this.state.highlight ? 'highlight' : '');
        return (
            <div className={classes} onClick={this.onClick}>
                <div className="person-name">{this.props.name}</div>
                <img className="person-img" src={this.props.imageUrl} />
                <div className="person-job">
                    {this.props.job}
                </div>
            </div>
        );
    }
});

Person.defaultProps = {
    imageUrl: 'http://www.gravatar.com/avatar/?d=identicon'
};

var PersonList = function() {
    return (
        <div className="person-list">
            <Person name="Derek Zoolander"
                    imageUrl="http://uifaces.com/assets/static/images/zoolander.jpg"
                    job="Male model" />
            <Person name="Donald Knuth"
                    imageUrl="http://www-cs-faculty.stanford.edu/~uno/don.gif"
                    job="Clever chap" />
        </div>
    );
};






document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<PersonList />, document.getElementById('app'));
});
