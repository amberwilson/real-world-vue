<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :event="event" :key="event.id" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService.js';

export default {
  data() {
    return {
      events: [],
    };
  },
  created() {
    const vm = this;
    EventService.getEvents()
      .then((res) => {
        vm.events = res.data;
      })
      .catch((err) => console.log(err));
  },
  components: {
    EventCard,
  },
};
</script>

<style></style>
