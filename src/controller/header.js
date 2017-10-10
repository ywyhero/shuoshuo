import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'header': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'background': '#1f1f1f'
  },
  'header-box': {
    'width': [{ 'unit': 'px', 'value': 1200 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'color': '#bfbfbf',
    'height': [{ 'unit': 'px', 'value': 40 }]
  },
  'header-left-firstheader-left-val': {
    'fontSize': [{ 'unit': 'px', 'value': 16 }]
  },
  'header-left-val': {
    'float': 'left',
    'lineHeight': [{ 'unit': 'px', 'value': 40 }],
    'fontSize': [{ 'unit': 'px', 'value': 12 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 20 }],
    'color': '#bfbfbf',
    'cursor': 'pointer'
  },
  'header-left-val:hover': {
    'background': '#383838'
  },
  'header-left-valactive': {
    'background': '#383838'
  },
  'header-right': {
    'float': 'right',
    'height': [{ 'unit': 'px', 'value': 40 }],
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center'
  },
  'header-right>img': {
    'marginRight': [{ 'unit': 'px', 'value': 10 }]
  },
  'header-right>span': {
    'whiteSpace': 'nowrap',
    'textOverflow': 'ellipsis',
    'maxWidth': [{ 'unit': 'px', 'value': 50 }],
    'overflow': 'hidden'
  },
  'header-right-btn': {
    'marginLeft': [{ 'unit': 'px', 'value': 20 }],
    'cursor': 'pointer'
  }
});
