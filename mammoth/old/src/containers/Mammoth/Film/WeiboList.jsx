import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
        >
        <MoreVertIcon color={grey400} />
    </IconButton>
);

const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
    </IconMenu>
);

const ListExampleMessages = () => (
    <div>
        <List>
            <ListItem
                leftAvatar={<Avatar src="/profile_photos/ice.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="Brendan Lim"
                secondaryText={
            <p>
              <span style={{color: darkBlack}}>Brunch this weekend?</span><br />
              I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
          }
                secondaryTextLines={2}
                />
            <Divider inset={true}/>
            <ListItem
                leftAvatar={<Avatar src="/profile_photos/griz.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="me, Scott, Jennifer"
                secondaryText={
            <p>
              <span style={{color: darkBlack}}>Summer BBQ</span><br />
              Wish I could come, but I&apos;m out of town this weekend.
            </p>
          }
                secondaryTextLines={2}
                />
            <Divider inset={true}/>
            <ListItem
                leftAvatar={<Avatar src="/profile_photos/grumpy.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="Grace Ng"
                secondaryText={
            <p>
              <span style={{color: darkBlack}}>Oui oui</span><br />
              Do you have any Paris recs? Have you ever been?
            </p>
          }
                secondaryTextLines={2}
                />
            <Divider inset={true}/>
            <ListItem
                leftAvatar={<Avatar src="/profile_photos/jack.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="Kerem Suer"
                secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
                secondaryTextLines={2}
                />
        </List>
    </div>
);

export default ListExampleMessages;