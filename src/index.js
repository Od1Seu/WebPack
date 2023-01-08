import * as $ from 'jquery'
import Post from "./Post";
import json from './assets/json'
import Logo from './assets/webpack-logo.png'
import xml from './assets/data'
import data_csv from './assets/data.csv'
import './styles/style.css'
import './bable';

const new_post = new Post('Webpack title', Logo);
$('pre').addClass('post_pre').html(new_post.toString());
// console.log('new_post:', new_post);
// console.log('Xml:', xml);
// console.log('Json:', json);
// console.log('data_csv:', data_csv)
