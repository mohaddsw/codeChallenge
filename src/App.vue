<template>
  <div id="app">
    <div class="header">Profiles List</div>
    <div class="content">
      <div class="tool-bar">
        <BaseInput
          class="filter"
          label="search:"
          v-model="searchQuery"
        />
        <button class="add-item" @click="addItem">
          add
        </button>
      </div>
      <div class="buttons">
        <button @click="sortAsc">▲</button>
        <button @click="sortDesc">▼</button>
      </div>

      <NewProfileCard
        v-for="profile in newProfiles"
        :key="profile.id"
        :profile="profile"
        class="profile"
        @save="saveItem($event)"
      />
      
      <ProfileCard
        v-for="profile in getFilteredList"
        :key="profile.id"
        :profile="profile"
        class="profile"
      />

      <div class="icons-note">
        Icons made by
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from "./components/ProfileCard";
import BaseInput from "./components/BaseComponent/BaseInput";
import NewProfileCard from "./components/NewProfileCard";


export default {
  name: "App",

  components: {
    ProfileCard,
    BaseInput,
    NewProfileCard
  },

  data() {
    return {
      searchQuery:'',
      profiles: [
        {
          id: 1,
          name: "Wojciech",
          email: "wojciech@poz.pl",
          description: "Anaesthesiologist",
          likes: 34
        },
        {
          id: 2,
          name: "Maria",
          email: "maria@poz.pl",
          description: "Radiologist",
          likes: 28
        },
        {
          id: 3,
          name: "Anna",
          email: "anna@poz.pl",
          description: "Surgeon",
          likes: 53
        }
      ],
      newProfiles: []
    };
  },

  computed:{
    getFilteredList() {
      return this.profiles.filter((item) => {
        return item ? item.name.toLowerCase().includes(this.searchQuery.toLowerCase()): null;
      });
    },
    factoryNewProfile() {
      const lastId = this.profiles[this.profiles.length-1].id
      return {
          id: lastId + 1,
          name: "",
          email: "",
          description: "",
          likes: 0
      }
    },
  },

  methods: {
    sortAsc() {
      this.profiles.sort(function(a, b) {
        return a.likes - b.likes;
      });
    },

    sortDesc() {
      this.profiles.sort(function(a, b) {
        return b.likes - a.likes;
      });
    },
    addItem(){
      this.newProfiles.push(Object.assign({},this.factoryNewProfile))
    },
    saveItem(item){
      const newItem = this.newProfiles.find(profile => profile.id === item.id)
      Object.assign(newItem, item)
      this.profiles = [ ...this.profiles, ...this.newProfiles]
      this.newProfiles = []
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Roboto", helvetica, arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  padding: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  background: linear-gradient(
    135deg,
    rgba(65, 184, 131, 0.9),
    rgba(52, 73, 94, 0.9)
  );

  font-size: 1.5em;
}

button {
  display: block;
  padding: 1em;
  width: 100%;
  background-color: #41B883;
  border: 1px solid;
  color: #fff;
  cursor: pointer;
  font-size: 0.75em;
  font-weight: 600;
  text-shadow: 0 1px 0 rgba(black, 0.2);
}

.content {
  width: 100%;
  min-width: 300px;
  padding: 2em;
  margin-top: 30px;
  position: relative;
  background: rgba(0, 0, 0, 0.15);
}

@media screen and (min-width: 600px) {
  .content {
    width: 50vw;
    max-width: 15em;
  }
}

.content::before {
  content: "";
  position: absolute;
  top: -2px;
  left: 0;
  height: 2px;
  width: 100%;
  background: #35c3c1;
}

.buttons {
  display: flex;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
}

.profile {
  margin-top: 20px;
}

.icons-note {
  margin-top: 30px;
  font-size: 10px;
}
.filter{
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
>>> .filter input{
  margin-left: 5px;
}
.tool-bar{
  font-size: 18px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-item{
  width: auto;
  padding: 3px 6px;
}
</style>
