<template>
  <div class="profile">
    <div class="card">
      <DoctorIcon class="avatar" />
      <div class="data">
        <div class="profile-content">
          <div>
            <BaseInput
              label="name:"
              type="text"
              :rule="{ regex: /^[a-z0-9]+$/i }"
              v-model="newProfile.name"
            />
            <!-- <strong>{{profile.name}}</strong> -->
            <!-- <a :href="profile.email" class="email">{{profile.email}}</a> -->
            <BaseInput
              label="email:"
              type="email"
              rule="email"
              v-model="newProfile.email"
            />
          </div>
          <BaseInput
            label="description:"
            type="text"
            :rule="{ regex: /^[a-z0-9]+$/i }"
            v-model="newProfile.description"
          />
          <!-- <div class="description">{{profile.description}}</div> -->
        </div>
        <div class="footer-card">
          <div class="likes" >
            <span class="likes-icon">💚</span>
            <span class="likes-value">{{ newProfile.likes }}</span>
          </div>
          <button class="submit-btn" @click="submit">save</button>
        </div>
      </div>
    </div>
    <div class="comment">
      <input class="comment-input" placeholder="Write your comment..." />
    </div>
  </div>
</template>

<script>
import DoctorIcon from "./DoctorIcon";
import BaseInput from "./BaseComponent/BaseInput.vue";

export default {
  name: "ProfileCard",

  components: {
    DoctorIcon,
    BaseInput,
  },

  props: {
    profile: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      newProfile: {
        id: this.profile.id,
        name: this.profile.name || "",
        email: this.profile.email || "",
        description: this.profile.description || "",
        likes: 0,
      },
    };
  },

  methods: {
    submit() {
      if (
        this.newProfile.name &&
        this.newProfile.email &&
        this.newProfile.description &&
        /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.newProfile.email) &&
        /^[a-z0-9]+$/i.test(this.newProfile.name)
      ) {
        this.$emit("save", this.newProfile);
      } else {
        alert("فیلد ها باید  به درستی پر باشند");
      }
    },

  },
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  border: solid 1px rgb(172, 172, 172);
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  color: rgb(82, 82, 82);
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.avatar {
  width: 64px;
  min-width: 64px;
  height: 64px;
  border: 1px solid rgb(172, 172, 172);
  border-radius: 100%;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
}

.data {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.profile-content {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 15px;
}

.email {
  margin-left: 15px;
}

.description {
  margin-top: 5px;
}

.likes {
  color: rgb(76, 202, 114);
  margin-left: 15px;
  cursor: pointer;
}

.likes-value {
  margin-left: 5px;
}

.comment {
  display: flex;
  width: 100%;
}

.comment-input {
  width: 100%;
}
.footer-card {
  margin-top: 10px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.submit-btn {
  display: block;
  padding: 3px 6px;
  background-color: #41b883;
  border: 1px solid;
  color: #fff;
  cursor: pointer;
  font-size: 0.75em;
  font-weight: 600;
  text-shadow: 0 1px 0 rgba(black, 0.2);
}
</style>
