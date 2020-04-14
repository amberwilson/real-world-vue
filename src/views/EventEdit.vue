<template>
  <div>
    <h1>Edit Event</h1>
    <form @submit="updateEvent">
      <div class="form-input">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div class="form-input">
        <label for="time">Time</label>
        <input type="time" id="time" v-model="time" required />
      </div>
      <div class="form-input">
        <label for="date">Date</label>
        <input type="date" id="date" v-model="date" required />
      </div>
      <div class="form-input">
        <label for="location">Location</label>
        <input type="text" id="location" v-model="location" required />
      </div>
      <div class="form-input">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="description"
          required
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div class="form-input">
        <label for="organizer">Organizer</label>
        <input type="text" id="organizer" v-model="organizer" required />
      </div>
      <div class="form-input">
        <label for="category">Category</label>
        <input type="text" id="category" v-model="category" required />
      </div>
      <div class="form-input">
        <label for="attendees"
          >Attendees (Hold &#8984;/Shirt or Ctrl/Shift to select
          multiples)</label
        >
        <select
          id="attendees"
          class="attendees-select"
          v-model="attendees"
          multiple
          required
        >
          <option v-for="person in people" :value="person.id" :key="person.id">
            {{ person.name }}
          </option>
        </select>
      </div>
      <router-link :to="{ name: 'event-list' }">Cancel</router-link>
      <button class="submit-button">SUBMIT</button>
    </form>
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
      people: [],
      title: '',
      time: '',
      date: '',
      location: '',
      description: '',
      organizer: '',
      category: '',
      attendees: [],
    };
  },
  created() {
    const vm = this;
    EventService.getEvent(this.id)
      .then((res) => {
        if (res.status === 200) {
          Object.keys(res.data).forEach((property) => {
            vm[property] = res.data[property];
          });
        }
      })
      .catch((err) => console.log(err));

    PersonService.getPeople()
      .then((res) => {
        if (res.status === 200) {
          vm.people = res.data;
        }
      })
      .catch((err) => console.log(err));
  },
  methods: {
    updateEvent() {
      const updatedEvent = {
        title: this.title,
        time: this.time,
        date: this.date,
        location: this.location,
        description: this.description,
        organizer: this.organizer,
        category: this.category,
        attendees: this.attendees,
      };
      EventService.updateEvent(this.id, updatedEvent)
        .then((res) => {
          if (res.status === 200) {
            this.$router.push({ name: 'event-list' });
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.form-input {
  padding: 1.5em 0;
}
.submit-button {
  background-color: #39b982;
  color: white;
}
.attendees-select {
  height: 15em;
}
</style>
