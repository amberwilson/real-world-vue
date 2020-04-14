import Vue from 'vue';
import VueRouter from 'vue-router';
import EventCreate from '../views/EventCreate.vue';
import EventEdit from '../views/EventEdit.vue';
import EventList from '../views/EventList.vue';
import EventShow from '../views/EventShow.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
  {
    path: '/event/edit/:id',
    name: 'event-edit',
    component: EventEdit,
    props: true,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
