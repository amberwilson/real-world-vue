<template>
  <div>
    <div v-if="event">
      <div class="event-header">
        <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
        <h1 class="title">{{ event.title }}</h1>
        <h5>Organized by {{ event.organizer }}</h5>
        <h5>Category: {{ event.category }}</h5>
      </div>
      <BaseIcon name="map"><h2>Location</h2></BaseIcon>
      <address>{{ event.location }}</address>
      <h2>Event details</h2>
      <p>{{ event.description }}</p>
      <h2>
        Attendees
        <span class="badge -fill-gradient">{{
          event.attendees ? event.attendees.length : 0
        }}</span>
      </h2>
      <ul class="list-group" v-if="Object.keys(people).length">
        <li
          v-for="attendee in event.attendees"
          :key="attendee"
          class="list-item"
        >
          <b>{{ getPersonName(attendee) }}</b>
        </li>
      </ul>
      <button class="edit-button" @click="editEvent">EDIT</button>
      <button class="delete-button" @click="deleteEvent">DELETE</button>
    </div>
    <div v-else>
      <h1>Event Not Found</h1>
      <span
        >🕵️‍♀️ Oops! We can't seem to find that event. Please select an event from
        the
        <router-link class="event-link" :to="{ name: 'event-list' }"
          >list</router-link
        >
        page.
      </span>
    </div>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js';
import PersonService from '@/services/PersonService.js';

export default {
  props: {
    id: {
      type: [Number, String],
    },
  },
  data() {
    return {
      event: null,
      people: [],
    };
  },
  created() {
    const vm = this;
    EventService.getEvent(this.id)
      .then((res) => {
        vm.event = res.data;
      })
      .catch((err) => console.log(err));

    PersonService.getPeople()
      .then((res) => {
        if (res.status === 200) {
          const reshapedPeople = {};
          res.data.forEach((person) => (reshapedPeople[person.id] = person));
          vm.people = reshapedPeople;
        }
      })
      .catch((err) => console.log(err));
  },
  methods: {
    getPersonName(id) {
      return this.people[id].name;
    },
    deleteEvent() {
      if (confirm(`🗑 Are you sure you want to delete this event?`)) {
        EventService.deleteEvent(this.id)
          .then((res) => {
            if (res.status === 200) {
              this.$router.push({ name: 'event-list' });
            }
          })
          .catch((err) => console.log(err));
      }
    },
    editEvent() {
      this.$router.push({ name: 'event-edit', props: { id: this.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
button {
  color: white;
  cursor: pointer;
  margin-top: 3em;
  padding: 1em;
  &.edit-button {
    background-color: #2196f3;
  }
  &.delete-button {
    background-color: #f44336;
  }
}
</style>
