import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import RingVolumeIcon from '@material-ui/icons/RingVolume';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import BuildIcon from '@material-ui/icons/Build';
import MemoryIcon from '@material-ui/icons/Memory';
import PeopleIcon from '@material-ui/icons/People';
import LinkIcon from '@material-ui/icons/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentIcon from '@material-ui/icons/Assignment';




export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <AirportShuttleIcon />
      </ListItemIcon>
      <ListItemText primary="서빙" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="청소" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MemoryIcon />
      </ListItemIcon>
      <ListItemText primary="딜리버드 관리" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BuildIcon />
      </ListItemIcon>
      <ListItemText primary="설정" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>관리자 메뉴</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="고객 관리" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LinkIcon />
      </ListItemIcon>
      <ListItemText primary="딜리버드 연동"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <RingVolumeIcon />
      </ListItemIcon>
      <ListItemText primary="상담 요청" />
    </ListItem>
  </div>
);