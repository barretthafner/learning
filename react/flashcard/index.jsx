var FlashCard = React.createClass({
    getInitialState: function() {
        return {
            english: 'Grapefruit',
            french: 'Pamplemousse',
            selected: 'english'
        }
    },

    onCardClick: function() {
        if (this.state.selected == 'english') {
            this.setState({
                selected: 'french'
            });
        }
        else {
            if (this.state.selected == 'french') {
                this.setState({
                    selected: 'english'
                });
            }
        }
    },
    render: function() {
        return <Card text={this.state[this.state.selected]}
                     onClick={this.onCardClick} />;
    }
});

var Card = function(props) {
    var style = {
        border: '1px solid black',
        height: '100px',
        lineHeight: '100px',
        width: '300px',
        textAlign: 'center',
        fontSize: '2em'
    };
    return (
        <div onClick={props.onClick} style={style}>
            {props.text}
        </div>
    );
};
