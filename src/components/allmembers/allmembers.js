import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'allmenbers-box-bottom': {
    'margin': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'width': [{ 'unit': '%H', 'value': 0.8 }]
  },
  'allmenbers-box-bottom>ul': {
    'listStyle': 'none'
  },
  'allmenbers-box-bottom>ul>li': {
    'display': 'flex',
    'justifyContent': 'space-between',
    'alignContent': 'center',
    'borderBottom': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#ccc' }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 20 }],
    'height': [{ 'unit': 'px', 'value': 80 }]
  },
  'allmenbers-box-bottom-name': {
    'fontSize': [{ 'unit': 'px', 'value': 30 }],
    'lineHeight': [{ 'unit': 'px', 'value': 80 }],
    'fontWeight': '500',
    'color': '#333'
  },
  'allmenbers-box-bottom-content': {
    'fontSize': [{ 'unit': 'px', 'value': 14 }]
  },
  'allmenbers-box-bottom-delete': {
    'color': 'red',
    'cursor': 'pointer',
    'lineHeight': [{ 'unit': 'px', 'value': 80 }]
  },
  'pagination': {
    'textAlign': 'center',
    'marginTop': [{ 'unit': 'px', 'value': 20 }]
  }
});
