import Post from "./Post";
import json from './assets/json'
import Logo from './assets/webpack-logo.png'
import xml from './assets/data.xml'
import './styles/style.css'

const new_post = new Post('Webpack title', Logo);
console.log('new_post:', new_post);
console.log('Xml:', xml);
console.log('Json:', json);
