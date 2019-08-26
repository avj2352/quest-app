/**
 * Map to hold the list of all icons based on their group names
 */
import React from 'react';
import StarIcon from '@material-ui/icons/Stars';
import PolymerIcon from '@material-ui/icons/Polymer';
import AngularIcon from '@material-ui/icons/BrightnessAuto';
import AlgoIcon from '@material-ui/icons/Subject';
import DataIcon from '@material-ui/icons/VerticalSplit';
import EsIcon from '@material-ui/icons/Bookmarks';
import PatternsIcon from '@material-ui/icons/VerticalSplit';
import NodeIcon from '@material-ui/icons/Http';
import QuestionIcon from '@material-ui/icons/QuestionAnswer';
import GroupIcon from '@material-ui/icons/CardMembership';
import TagIcon from '@material-ui/icons/SettingsEthernet';
import AllIcon from '@material-ui/icons/AccountBalance';
import SortingIcon from '@material-ui/icons/LibraryBooks';
import FlutterIcon from '@material-ui/icons/MobileFriendly';
import CSSIcon from '@material-ui/icons/ImportantDevices';
import JSIcon from '@material-ui/icons/Build';
import UXIcon from '@material-ui/icons/PanTool';



export const showIcon = (name) => {
    switch (name) {
        case 'all':
            return <AllIcon/>;
        case 'tags':
            return <TagIcon/>;
        case 'groups':
            return <GroupIcon/>;
        case 'questions':
            return <QuestionIcon/>;
        case 'node':
            return <NodeIcon/>;
        case 'patterns':
            return <PatternsIcon/>;
        case 'es':
            return <EsIcon/>;
        case 'react':
            return <PolymerIcon/>;
        case 'vue':
            return <PolymerIcon/>;
        case 'angular':
            return <AngularIcon/>;
        case 'algos':
            return <AlgoIcon/>;
        case 'ds':
            return <DataIcon/>;
        case 'sorting':
            return <SortingIcon/>;
        case 'flutter':
            return <FlutterIcon/>;
        case 'css':
            return <CSSIcon/>;
        case 'js':
            return <JSIcon/>;
        case 'nest':
            return <NodeIcon/>;
        case 'ux':
            return <UXIcon/>;
        default:
            return <StarIcon/>;
    }
}