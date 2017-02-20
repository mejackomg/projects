



export default class PopoverExampleSimple extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            isname:'click me'
        };
    }
    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,

        });
    };

    render() {
        return (
            <div>
                <RaisedButton
                    onTouchTap={this.handleTouchTap}
                    label={this.state.isname}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu>
                        <MenuItem value={1} primaryText="Refresh" />
                        <MenuItem value={2} primaryText="Help &amp; feedback" />
                        <MenuItem value={3} primaryText="Settings" />
                        <MenuItem value={4} primaryText="Sign out" />
                    </Menu>
                </Popover>
            </div>
        );
    }
}