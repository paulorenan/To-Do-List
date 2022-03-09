import Vue from 'vue'
import VueResource from 'vue-resource'
import services from './services'
import interceptors from './interceptors'

Vue.use(VueResource);

const http = Vue.http;

http.options.root = 'https://back2dolist.herokuapp.com/';

http.interceptors.push(interceptors);

Object.keys(services).map(service => {
  services[service] = Vue.resource('', {}, services[service]);
});

const setBearerToken = (token) => {
  http.headers.common['Authorization'] = token;
};

export default services;
export { http, setBearerToken };